import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Headphones, User, Bot, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  needsHumanHelp?: boolean;
}

interface LeadCaptureForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadCaptureForm>({
    name: '', email: '', phone: '', message: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(crypto.randomUUID());
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message when chat opens
      const welcomeMessage: ChatMessage = {
        id: crypto.randomUUID(),
        content: "Bonjour ! Je suis votre assistant RCS Express. Comment puis-je vous aider avec votre création d'entreprise ? 🚀\n\nJe peux vous renseigner sur :\n• Les délais (24h garanties)\n• Les structures juridiques (SASU, SARL, etc.)\n• Les tarifs (129€ tout inclus)\n• Les documents nécessaires",
        isBot: true,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chatbot-ai', {
        body: {
          message: inputValue,
          session_id: sessionId.current,
          user_agent: navigator.userAgent,
          page_url: window.location.href
        }
      });

      if (error) throw error;

      const botMessage: ChatMessage = {
        id: crypto.randomUUID(),
        content: data.response,
        isBot: true,
        timestamp: new Date(),
        needsHumanHelp: data.needsHumanHelp
      };

      setMessages(prev => [...prev, botMessage]);

      // Show lead capture for complex questions
      if (data.needsHumanHelp) {
        setTimeout(() => setShowLeadCapture(true), 1000);
      }

    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        content: "Désolé, je rencontre une difficulté technique. Un expert va vous répondre rapidement. Pouvez-vous laisser vos coordonnées ?",
        isBot: true,
        timestamp: new Date(),
        needsHumanHelp: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setShowLeadCapture(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const submitLeadCapture = async () => {
    try {
      const { error } = await supabase.from('leads').insert({
        email: leadForm.email,
        phone: leadForm.phone,
        company_name: leadForm.message,
        utm_source: 'chatbot_widget'
      });

      if (error) throw error;

      toast({
        title: "Merci !",
        description: "Un expert vous contactera sous 2h pendant les heures ouvrées.",
      });

      setShowLeadCapture(false);
      setLeadForm({ name: '', email: '', phone: '', message: '' });

      // Add confirmation message
      const confirmMessage: ChatMessage = {
        id: crypto.randomUUID(),
        content: "Parfait ! Un de nos experts juridiques vous contactera sous 2h pendant les heures ouvrées (9h-19h). Merci de votre confiance ! 😊",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, confirmMessage]);

    } catch (error) {
      console.error('Lead capture error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive"
      });
    }
  };

  const formatMessageContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <>
      {/* Chat Bubble Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-institutional hover:bg-institutional/90 text-white shadow-2xl hover:shadow-institutional/25 transition-all duration-300 transform hover:scale-105"
          style={{ 
            background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
            boxShadow: '0 8px 32px rgba(220, 38, 38, 0.3)'
          }}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
              <Headphones className="w-6 h-6" />
              {/* Pulsing indicator */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
          )}
        </Button>

        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-navy text-white text-sm rounded-lg shadow-lg whitespace-nowrap animate-fade-in">
            Besoin d'aide ? Chattez avec un expert
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-navy"></div>
          </div>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-3xl shadow-2xl border border-gray-100 z-40 animate-scale-in">
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-institutional via-institutional/95 to-institutional rounded-t-3xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Expert RCS Express</h3>
                  <p className="text-sm text-white/90">En ligne • Répond en 30s</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0 h-80 overflow-hidden">
            {!showLeadCapture ? (
              <>
                {/* Messages */}
                <div className="h-full overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[80%] ${
                        message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.isBot 
                            ? 'bg-institutional/10 text-institutional' 
                            : 'bg-navy/10 text-navy'
                        }`}>
                          {message.isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        </div>
                        <div className={`rounded-2xl px-4 py-3 ${
                          message.isBot
                            ? 'bg-gray-50 text-gray-800'
                            : 'bg-institutional text-white'
                        }`}>
                          <p className="text-sm leading-relaxed">
                            {formatMessageContent(message.content)}
                          </p>
                          {message.needsHumanHelp && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <Button
                                size="sm"
                                onClick={() => setShowLeadCapture(true)}
                                className="bg-navy hover:bg-navy/90 text-white text-xs px-3 py-1 h-auto"
                              >
                                <Phone className="w-3 h-3 mr-1" />
                                Parler à un expert
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-institutional/10 text-institutional flex items-center justify-center">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-gray-50 rounded-2xl px-4 py-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-100">
                  <div className="flex space-x-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Tapez votre question..."
                      className="flex-1 border-gray-200 focus:border-institutional focus:ring-institutional/20"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      className="bg-institutional hover:bg-institutional/90 text-white px-4"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              /* Lead Capture Form */
              <div className="p-6 h-full overflow-y-auto">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-institutional/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-institutional" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">
                    Parlons de votre projet
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Un expert vous contactera sous 2h pour une réponse personnalisée
                  </p>
                </div>

                <div className="space-y-4">
                  <Input
                    placeholder="Votre nom *"
                    value={leadForm.name}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, name: e.target.value }))}
                    className="border-gray-200 focus:border-institutional"
                  />
                  <Input
                    type="email"
                    placeholder="Votre email *"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, email: e.target.value }))}
                    className="border-gray-200 focus:border-institutional"
                  />
                  <Input
                    type="tel"
                    placeholder="Votre téléphone *"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="border-gray-200 focus:border-institutional"
                  />
                  <Input
                    placeholder="Nom de votre projet d'entreprise"
                    value={leadForm.message}
                    onChange={(e) => setLeadForm(prev => ({ ...prev, message: e.target.value }))}
                    className="border-gray-200 focus:border-institutional"
                  />
                  
                  <div className="flex space-x-2 pt-2">
                    <Button
                      onClick={() => setShowLeadCapture(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Retour
                    </Button>
                    <Button
                      onClick={submitLeadCapture}
                      disabled={!leadForm.name || !leadForm.email || !leadForm.phone}
                      className="flex-1 bg-institutional hover:bg-institutional/90 text-white"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Envoyer
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </div>
      )}
    </>
  );
};