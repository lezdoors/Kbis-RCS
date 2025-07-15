import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export const FAQSection = () => {
  const faqs = [
    {
      question: "Qu'est-ce que le Registre du Commerce et des Sociétés ?",
      answer: "Le RCS est le registre officiel tenu par les greffes des tribunaux de commerce. Il recense toutes les entreprises commerciales et sociétés en France.",
      category: "Général"
    },
    {
      question: "Quels documents dois-je fournir pour l'immatriculation ?",
      answer: "Les documents requis varient selon le statut juridique : pièce d'identité, justificatif de domicile, statuts signés, attestation de dépôt des fonds.",
      category: "Documents"
    },
    {
      question: "Quel est le délai pour recevoir l'extrait Kbis ?",
      answer: "L'extrait Kbis est généralement délivré sous 48 à 72h après validation complète du dossier par le greffe compétent.",
      category: "Délais"
    },
    {
      question: "Comment suivre l'avancement de mon dossier ?",
      answer: "Vous recevez un numéro de suivi et des notifications par email à chaque étape du traitement de votre dossier.",
      category: "Suivi"
    }
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Questions fréquentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Trouvez les réponses aux questions les plus courantes sur l'immatriculation RCS
          </p>
        </div>

        <div className="relative">
          {/* Floating success illustration */}
          <div className="absolute -top-4 -right-4 hidden lg:block">
            <img 
              src="https://qjktghkheyompsxuwzqo.supabase.co/storage/v1/object/public/toons/Toon-red-stairs.jpg.png"
              alt="Succès client mis en avant par la progression graphique"
              className="w-44 max-w-[180px] h-auto object-contain rounded-xl shadow-lg pt-4"
            />
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-xl px-6 py-2">
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="text-primary border-primary">
                      {faq.category}
                    </Badge>
                    <span className="font-semibold text-foreground">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};