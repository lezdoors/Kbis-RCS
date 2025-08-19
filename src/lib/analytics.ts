// Mock analytics for offline development
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

    // Store analytics locally for offline development
    const existingEvents = JSON.parse(localStorage.getItem('analytics') || '[]');
    existingEvents.push(eventData);
    localStorage.setItem('analytics', JSON.stringify(existingEvents));
    
    console.log('Analytics event tracked locally:', eventData);
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
  GUARANTEE_BADGE_CLICK: 'guarantee_badge_click',
  PAYMENT_SUCCESS: 'payment_success'
} as const;