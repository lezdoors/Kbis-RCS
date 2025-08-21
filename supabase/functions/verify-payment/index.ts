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
    console.log("Payment verification started");

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
    const { session_id, order_id } = await req.json();

    if (!session_id || !order_id) {
      throw new Error("Missing session_id or order_id");
    }

    console.log("Verifying payment for session:", session_id, "order:", order_id);

    // Retrieve checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);
    
    if (!session) {
      throw new Error("Session not found");
    }

    console.log("Session status:", session.payment_status);

    // Update order status based on payment status
    let orderStatus = 'pending';
    if (session.payment_status === 'paid') {
      orderStatus = 'paid';
    } else if (session.payment_status === 'unpaid') {
      orderStatus = 'payment_failed';
    }

    // Update order in database
    const { data: orderData, error: orderError } = await supabaseService
      .from("kbis_orders")
      .update({ 
        status: orderStatus,
        stripe_payment_id: session_id,
        updated_at: new Date().toISOString()
      })
      .eq("id", order_id)
      .select()
      .single();

    if (orderError) {
      console.error("Order update error:", orderError);
      throw new Error(`Failed to update order: ${orderError.message}`);
    }

    console.log("Order updated successfully:", orderData.id, "Status:", orderStatus);

    return new Response(JSON.stringify({ 
      success: true,
      payment_status: session.payment_status,
      order_status: orderStatus,
      order: orderData
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Payment verification error:", errorMessage);
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      success: false
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});