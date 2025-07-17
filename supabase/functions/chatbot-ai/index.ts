import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  message: string;
  user_id?: string;
  session_id: string;
  user_agent?: string;
  page_url?: string;
}

const serve_handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase credentials not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { message, user_id, session_id, user_agent, page_url }: ChatMessage = await req.json();

    console.log('Received chat message:', { message, session_id });

    // System prompt for French legal/business assistant
    const systemPrompt = `Tu es un assistant expert en création d'entreprise pour RCS Express, la plateforme française de création d'entreprise la plus rapide (24h garanties).

INFORMATIONS CLÉS À RETENIR :
- RCS Express : création d'entreprise en 24h garanties
- Prix : 129€ tout inclus (vs concurrents avec frais cachés)
- Structures disponibles : SASU (recommandée), SARL, EURL, SAS, Micro-entreprise
- Support expert disponible, suivi temps réel
- Plus de 300,000 entreprises créées

DOMAINES D'EXPERTISE :
1. Délais et processus (24h garanties, étapes claires)
2. Structures juridiques (SASU recommandée pour la plupart des cas)
3. Tarification (129€ tout inclus, transparence totale)
4. Documents requis (selon la structure choisie)
5. Avantages vs concurrents (LegalPlace, LegalStart)

INSTRUCTIONS :
- Réponds TOUJOURS en français
- Sois professionnel, rassurant et expert
- Utilise les informations RCS Express dans tes réponses
- Pour les questions complexes, propose un transfert vers un expert humain
- Capture les coordonnées pour les demandes non urgentes
- Reste dans le domaine de la création d'entreprise

Si la question est hors sujet, redirige poliment vers la création d'entreprise.
Si la question est trop complexe, propose : "Je vous mets en relation avec un de nos experts juridiques pour une réponse personnalisée."`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('AI response generated:', aiResponse.substring(0, 100) + '...');

    // Store chat interaction for analytics
    try {
      const { error: analyticsError } = await supabase
        .from('analytics')
        .insert({
          event_type: 'chatbot_interaction',
          user_id: user_id || null,
          session_id,
          page_url,
          user_agent,
          metadata: {
            user_message: message,
            ai_response: aiResponse,
            model: 'gpt-4-turbo-preview',
            timestamp: new Date().toISOString()
          }
        });

      if (analyticsError) {
        console.error('Analytics storage error:', analyticsError);
      }
    } catch (analyticsError) {
      console.error('Failed to store analytics:', analyticsError);
    }

    // Determine if response suggests human handoff
    const needsHumanHelp = aiResponse.toLowerCase().includes('expert') || 
                          aiResponse.toLowerCase().includes('spécialisé') ||
                          aiResponse.toLowerCase().includes('complexe');

    return new Response(JSON.stringify({
      response: aiResponse,
      needsHumanHelp,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chatbot-ai function:', error);
    
    // Fallback response in French
    const fallbackResponse = "Je rencontre une difficulté technique. Un de nos experts va vous répondre sous peu. Merci de votre patience.";
    
    return new Response(JSON.stringify({
      response: fallbackResponse,
      needsHumanHelp: true,
      error: true
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

serve(serve_handler);