import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  type: 'consultation' | 'callback' | 'newsletter' | 'document' | 'exit_intent';
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  businessType?: string;
  message?: string;
  subject?: string;
  consultationType?: string;
  preferredDate?: string;
  preferredTime?: string;
  interests?: string[];
  firstName?: string;
  documentTitle?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    
    // Generate email content based on form type
    let emailSubject = "";
    let emailHtml = "";
    let adminEmailHtml = "";

    switch (formData.type) {
      case 'consultation':
        emailSubject = "Confirmation de votre demande de consultation";
        emailHtml = generateConsultationConfirmationEmail(formData);
        adminEmailHtml = generateConsultationAdminEmail(formData);
        break;
      
      case 'callback':
        emailSubject = "Confirmation de votre demande de rappel";
        emailHtml = generateCallbackConfirmationEmail(formData);
        adminEmailHtml = generateCallbackAdminEmail(formData);
        break;
      
      case 'newsletter':
        emailSubject = "Bienvenue dans notre newsletter !";
        emailHtml = generateNewsletterWelcomeEmail(formData);
        adminEmailHtml = generateNewsletterAdminEmail(formData);
        break;
      
      case 'document':
        emailSubject = "Votre document est prêt !";
        emailHtml = generateDocumentEmail(formData);
        adminEmailHtml = generateDocumentAdminEmail(formData);
        break;
      
      case 'exit_intent':
        emailSubject = "Votre guide gratuit est arrivé !";
        emailHtml = generateExitIntentEmail(formData);
        adminEmailHtml = generateExitIntentAdminEmail(formData);
        break;
      
      default:
        throw new Error("Unknown form type");
    }

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: "RCS Express <contact@obtenirkbis.fr>",
      to: [formData.email],
      subject: emailSubject,
      html: emailHtml,
    });

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "RCS Express <contact@obtenirkbis.fr>",
      to: ["contact@obtenirkbis.fr"],
      subject: `[${formData.type.toUpperCase()}] Nouvelle demande de ${formData.name || formData.firstName || formData.email}`,
      html: adminEmailHtml,
    });

    console.log("Emails sent successfully:", { userEmailResponse, adminEmailResponse });

    return new Response(JSON.stringify({ 
      success: true, 
      userEmailId: userEmailResponse.data?.id,
      adminEmailId: adminEmailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

// Email template functions
function generateConsultationConfirmationEmail(data: ContactFormData): string {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #000091 0%, #1e40af 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; font-size: 28px; font-weight: bold;">RCS Express</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px;">Consultation confirmée</p>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 12px 12px;">
        <h2 style="color: #1f2937; margin-top: 0;">Bonjour ${data.name || data.firstName},</h2>
        
        <p style="color: #4b5563; line-height: 1.6;">
          Nous avons bien reçu votre demande de consultation gratuite. Un de nos experts juridiques vous contactera dans les 24h pour confirmer votre rendez-vous.
        </p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1f2937; margin-top: 0;">Détails de votre demande :</h3>
          <ul style="color: #4b5563; padding-left: 20px;">
            <li><strong>Type de consultation :</strong> ${data.consultationType || 'Non spécifié'}</li>
            <li><strong>Type d'entreprise :</strong> ${data.businessType || 'Non spécifié'}</li>
            <li><strong>Date souhaitée :</strong> ${data.preferredDate || 'Flexible'}</li>
            <li><strong>Horaire souhaité :</strong> ${data.preferredTime || 'Flexible'}</li>
            ${data.message ? `<li><strong>Message :</strong> ${data.message}</li>` : ''}
          </ul>
        </div>
        
        <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">Ce qui vous attend :</h3>
          <ul style="color: #1e40af; padding-left: 20px;">
            <li>Analyse personnalisée de votre projet</li>
            <li>Recommandations sur le statut juridique optimal</li>
            <li>Conseils sur l'optimisation fiscale</li>
            <li>Réponses à toutes vos questions</li>
          </ul>
        </div>
        
        <p style="color: #4b5563; line-height: 1.6;">
          En cas de questions, n'hésitez pas à nous contacter à <a href="mailto:contact@obtenirkbis.fr" style="color: #1e40af;">contact@obtenirkbis.fr</a>.
        </p>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #6b7280; font-size: 14px;">
            Cordialement,<br>
            L'équipe RCS Express
          </p>
        </div>
      </div>
    </div>
  `;
}

function generateConsultationAdminEmail(data: ContactFormData): string {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #1f2937;">Nouvelle demande de consultation</h2>
      
      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Nom :</strong> ${data.name}</p>
        <p><strong>Email :</strong> ${data.email}</p>
        <p><strong>Téléphone :</strong> ${data.phone || 'Non fourni'}</p>
        <p><strong>Type d'entreprise :</strong> ${data.businessType || 'Non spécifié'}</p>
        <p><strong>Type de consultation :</strong> ${data.consultationType || 'Non spécifié'}</p>
        <p><strong>Date souhaitée :</strong> ${data.preferredDate || 'Flexible'}</p>
        <p><strong>Horaire souhaité :</strong> ${data.preferredTime || 'Flexible'}</p>
        ${data.message ? `<p><strong>Message :</strong> ${data.message}</p>` : ''}
      </div>
      
      <p style="color: #dc2626; font-weight: bold;">Action requise : Contacter le client dans les 24h</p>
    </div>
  `;
}

function generateCallbackConfirmationEmail(data: ContactFormData): string {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; font-size: 28px; font-weight: bold;">RCS Express</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px;">Rappel confirmé</p>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 12px 12px;">
        <h2 style="color: #1f2937; margin-top: 0;">Bonjour ${data.name || data.firstName},</h2>
        
        <p style="color: #4b5563; line-height: 1.6;">
          Votre demande de rappel a été enregistrée avec succès. Nous vous contacterons dans les 2h (jours ouvrés) au numéro ${data.phone}.
        </p>
        
        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #059669; margin-top: 0;">Détails de votre demande :</h3>
          <ul style="color: #047857; padding-left: 20px;">
            <li><strong>Sujet :</strong> ${data.subject || 'Non spécifié'}</li>
            <li><strong>Horaire préféré :</strong> ${data.preferredTime || 'Flexible'}</li>
            ${data.message ? `<li><strong>Message :</strong> ${data.message}</li>` : ''}
          </ul>
        </div>
        
        <p style="color: #4b5563; line-height: 1.6;">
          En cas de questions, contactez-nous à <a href="mailto:contact@obtenirkbis.fr" style="color: #059669;">contact@obtenirkbis.fr</a>.
        </p>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #6b7280; font-size: 14px;">
            Cordialement,<br>
            L'équipe RCS Express
          </p>
        </div>
      </div>
    </div>
  `;
}

function generateCallbackAdminEmail(data: ContactFormData): string {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #1f2937;">Nouvelle demande de rappel</h2>
      
      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Nom :</strong> ${data.name}</p>
        <p><strong>Email :</strong> ${data.email}</p>
        <p><strong>Téléphone :</strong> ${data.phone}</p>
        <p><strong>Sujet :</strong> ${data.subject || 'Non spécifié'}</p>
        <p><strong>Horaire préféré :</strong> ${data.preferredTime || 'Flexible'}</p>
        ${data.message ? `<p><strong>Message :</strong> ${data.message}</p>` : ''}
      </div>
      
      <p style="color: #dc2626; font-weight: bold;">Action requise : Rappeler dans les 2h</p>
    </div>
  `;
}

function generateNewsletterWelcomeEmail(data: ContactFormData): string {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; font-size: 28px; font-weight: bold;">RCS Express</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px;">Bienvenue dans notre newsletter !</p>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 12px 12px;">
        <h2 style="color: #1f2937; margin-top: 0;">Bonjour ${data.firstName || data.name},</h2>
        
        <p style="color: #4b5563; line-height: 1.6;">
          Félicitations ! Vous faites maintenant partie de notre communauté de +50 000 entrepreneurs qui reçoivent nos conseils d'experts.
        </p>
        
        <div style="background: #faf5ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #7c3aed; margin-top: 0;">Ce que vous recevrez :</h3>
          <ul style="color: #7c3aed; padding-left: 20px;">
            <li>Conseils exclusifs d'experts juridiques</li>
            <li>Actualités légales et fiscales</li>
            <li>Guides pratiques et templates</li>
            <li>Invitations aux webinaires gratuits</li>
          </ul>
        </div>
        
        <p style="color: #4b5563; line-height: 1.6;">
          Pour toute question, contactez-nous à <a href="mailto:contact@obtenirkbis.fr" style="color: #7c3aed;">contact@obtenirkbis.fr</a>.
        </p>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #6b7280; font-size: 14px;">
            Cordialement,<br>
            L'équipe RCS Express
          </p>
        </div>
      </div>
    </div>
  `;
}

function generateNewsletterAdminEmail(data: ContactFormData): string {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #1f2937;">Nouvelle inscription newsletter</h2>
      
      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Nom :</strong> ${data.firstName || 'Non fourni'}</p>
        <p><strong>Email :</strong> ${data.email}</p>
        <p><strong>Centres d'intérêt :</strong> ${data.interests?.join(', ') || 'Non spécifiés'}</p>
      </div>
    </div>
  `;
}

function generateDocumentEmail(data: ContactFormData): string {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #ea580c 0%, #f97316 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; font-size: 28px; font-weight: bold;">RCS Express</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px;">Votre document est prêt !</p>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 12px 12px;">
        <h2 style="color: #1f2937; margin-top: 0;">Bonjour ${data.firstName || data.name},</h2>
        
        <p style="color: #4b5563; line-height: 1.6;">
          Votre document "<strong>${data.documentTitle || 'Guide PDF'}</strong>" est maintenant disponible en téléchargement.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="#" style="background: #ea580c; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            📄 Télécharger le document
          </a>
        </div>
        
        <p style="color: #4b5563; line-height: 1.6;">
          En cas de problème, contactez-nous à <a href="mailto:contact@obtenirkbis.fr" style="color: #ea580c;">contact@obtenirkbis.fr</a>.
        </p>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #6b7280; font-size: 14px;">
            Cordialement,<br>
            L'équipe RCS Express
          </p>
        </div>
      </div>
    </div>
  `;
}

function generateDocumentAdminEmail(data: ContactFormData): string {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #1f2937;">Nouveau téléchargement de document</h2>
      
      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Nom :</strong> ${data.firstName || 'Non fourni'}</p>
        <p><strong>Email :</strong> ${data.email}</p>
        <p><strong>Entreprise :</strong> ${data.company || 'Non fournie'}</p>
        <p><strong>Type d'entreprise :</strong> ${data.businessType || 'Non spécifié'}</p>
        <p><strong>Document :</strong> ${data.documentTitle || 'Guide PDF'}</p>
      </div>
    </div>
  `;
}

function generateExitIntentEmail(data: ContactFormData): string {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; font-size: 28px; font-weight: bold;">RCS Express</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px;">Votre guide gratuit est arrivé !</p>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 12px 12px;">
        <h2 style="color: #1f2937; margin-top: 0;">Bonjour,</h2>
        
        <p style="color: #4b5563; line-height: 1.6;">
          Merci pour votre intérêt ! Voici votre guide gratuit : <strong>"Créer son entreprise en 2024"</strong>.
        </p>
        
        <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #dc2626; margin-top: 0;">Ce que vous trouverez dans ce guide :</h3>
          <ul style="color: #dc2626; padding-left: 20px;">
            <li>Comparatif des statuts juridiques</li>
            <li>Étapes de création détaillées</li>
            <li>Optimisations fiscales</li>
            <li>Checklist complète</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="#" style="background: #dc2626; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            📖 Télécharger le guide
          </a>
        </div>
        
        <p style="color: #4b5563; line-height: 1.6;">
          Questions ? Contactez-nous à <a href="mailto:contact@obtenirkbis.fr" style="color: #dc2626;">contact@obtenirkbis.fr</a>.
        </p>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #6b7280; font-size: 14px;">
            Cordialement,<br>
            L'équipe RCS Express
          </p>
        </div>
      </div>
    </div>
  `;
}

function generateExitIntentAdminEmail(data: ContactFormData): string {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #1f2937;">Nouveau lead exit-intent</h2>
      
      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Email :</strong> ${data.email}</p>
        <p><strong>Source :</strong> Popup exit-intent</p>
        <p><strong>Document demandé :</strong> Guide "Créer son entreprise en 2024"</p>
      </div>
    </div>
  `;
}

serve(handler);