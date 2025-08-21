import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Payment function started");

    // Initialize Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    // Create Supabase client with service role for database operations
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Parse request body
    const { 
      companyName, 
      siren, 
      siret, 
      firstName, 
      lastName, 
      email, 
      phone, 
      serviceType = "express" 
    } = await req.json();

    console.log("Processing payment for:", { companyName, siren, email, serviceType });

    if (!companyName || !siren || !firstName || !lastName || !email) {
      throw new Error("Missing required fields");
    }

    // Service pricing and details
    const services = {
      standard: { price: 3900, name: "Standard", delivery: "Livraison en 4h maximum par email" },
      express: { price: 5900, name: "Express", delivery: "Livraison en 2h maximum par email + SMS" },
      postal: { price: 4400, name: "Postal", delivery: "Livraison 48h par courrier recommandé" }
    };

    const selectedService = services[serviceType as keyof typeof services] || services.express;
    const customerName = `${firstName} ${lastName}`;

    // Check if Stripe customer exists
    const customers = await stripe.customers.list({ 
      email: email, 
      limit: 1 
    });

    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log("Existing customer found:", customerId);
    } else {
      // Create new customer
      const customer = await stripe.customers.create({
        email: email,
        name: customerName,
        phone: phone,
      });
      customerId = customer.id;
      console.log("New customer created:", customerId);
    }

    // Create order in database first
    const { data: orderData, error: orderError } = await supabaseService
      .from("kbis_orders")
      .insert({
        company_name: companyName,
        siren: siren,
        siret: siret || null,
        customer_name: customerName,
        customer_email: email,
        customer_phone: phone || null,
        service_type: serviceType,
        delivery_method: serviceType === 'postal' ? 'postal' : 'email',
        status: 'pending',
        amount_paid: selectedService.price,
      })
      .select()
      .single();

    if (orderError) {
      console.error("Order creation error:", orderError);
      throw new Error(`Failed to create order: ${orderError.message}`);
    }

    console.log("Order created:", orderData.id);

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `KBIS ${selectedService.name} - ${companyName}`,
              description: selectedService.delivery,
              metadata: {
                company_name: companyName,
                siren: siren,
                service_type: serviceType,
              }
            },
            unit_amount: selectedService.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderData.id}`,
      cancel_url: `${req.headers.get("origin")}/?cancelled=true`,
      metadata: {
        order_id: orderData.id,
        company_name: companyName,
        siren: siren,
        service_type: serviceType,
      },
    });

    // Update order with Stripe session ID
    await supabaseService
      .from("kbis_orders")
      .update({ 
        stripe_payment_id: session.id,
        status: 'payment_pending'
      })
      .eq("id", orderData.id);

    console.log("Stripe session created:", session.id);

    return new Response(JSON.stringify({ 
      url: session.url,
      order_id: orderData.id,
      session_id: session.id
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Payment function error:", errorMessage);
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: "Une erreur est survenue lors du traitement du paiement"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});