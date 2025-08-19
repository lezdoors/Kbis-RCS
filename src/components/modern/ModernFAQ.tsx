import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export const ModernFAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "Quelle est la différence avec Infogreffe ?",
      answer: "Contrairement à Infogreffe, nous offrons un service premium avec une livraison garantie en 2h maximum, un support client dédié 7j/7, et des prix transparents sans frais cachés. Notre processus est entièrement optimisé pour les entrepreneurs pressés."
    },
    {
      question: "Combien de temps pour recevoir mon KBIS ?",
      answer: "Nous garantissons une livraison en maximum 2h pour notre service Express, 4h pour le service Standard, et 48h pour l'envoi postal. Dans 95% des cas, vous recevez votre document en moins d'1h30."
    },
    {
      question: "Le document est-il vraiment officiel ?",
      answer: "Absolument. Nous obtenons tous nos extraits KBIS directement auprès du Registre du Commerce et des Sociétés (RCS). Nos documents sont 100% officiels et acceptés par toutes les administrations, banques et partenaires commerciaux."
    },
    {
      question: "Que se passe-t-il si ma commande échoue ?",
      answer: "En cas d'échec de commande (entreprise introuvable, données incorrectes), vous êtes immédiatement remboursé à 100%. Notre équipe vous contacte également pour vous proposer des solutions alternatives."
    },
    {
      question: "Puis-je obtenir une facture ?",
      answer: "Oui, une facture détaillée vous est automatiquement envoyée par email dès la validation de votre commande. Vous pouvez également télécharger vos factures depuis votre espace client."
    },
    {
      question: "Vos prix sont-ils vraiment transparents ?",
      answer: "Nos prix affichés sont définitifs, sans frais cachés ni suppléments surprise. Le prix que vous voyez est exactement ce que vous payez, taxes comprises."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="section-modern bg-white">
      <div className="container-modern">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <HelpCircle className="w-8 h-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Questions fréquentes
            </h2>
          </div>
          <p className="text-large text-muted-foreground">
            Découvrez pourquoi nous surpassons nos concurrents
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="card-modern p-0 overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-8 text-left hover:bg-muted/30 transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="font-semibold text-feature text-foreground">
                    {faq.question}
                  </span>
                </div>
                {openFAQ === index ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              
              {openFAQ === index && (
                <div className="px-8 pb-8">
                  <div className="ml-9">
                    <p className="text-feature text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};