import { supabase } from "@/integrations/supabase/client";

interface AnalyticsEvent {
  event_type: string;
  entity_type?: string;
  question_id?: string;
  user_agent?: string;
  page_url?: string;
  user_id?: string;
  session_id?: string;
  metadata?: Record<string, any>;
}

export const trackEvent = async (event: AnalyticsEvent) => {
  try {
    const eventData = {
      ...event,
      user_agent: navigator.userAgent,
      page_url: window.location.href,
      session_id: getSessionId(),
      timestamp: new Date().toISOString()
    };

    const { error } = await supabase
      .from('analytics')
      .insert(eventData);

    if (error) {
      console.warn('Analytics tracking error:', error);
    }
  } catch (error) {
    console.warn('Analytics tracking failed:', error);
  }
};

// Generate session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};

// Predefined event types for consistency
export const ANALYTICS_EVENTS = {
  HERO_CTA_CLICK: 'hero_cta_click',
  ENTITY_SELECTED: 'entity_selected',
  FAQ_OPENED: 'faq_opened',
  PAGE_VIEW: 'page_view',
  PROCESS_STEP_VIEW: 'process_step_view',
  TRUST_BADGE_CLICK: 'trust_badge_click',
  COMPETITIVE_COMPARISON_VIEW: 'competitive_comparison_view',
  GUARANTEE_BADGE_CLICK: 'guarantee_badge_click'
} as const;