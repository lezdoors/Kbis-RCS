import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export const FAQSection = () => {
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="w-6 h-6 text-brand-blue" />
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue">
              Questions fréquentes sur notre service
            </h2>
          </div>
          <p className="text-lg text-gray-600">
            Découvrez pourquoi nous surpassons nos concurrents
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-brand-blue flex-shrink-0" />
                  <span className="font-semibold text-brand-blue">
                    {faq.question}
                  </span>
                </div>
                {openFAQ === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              {openFAQ === index && (
                <div className="px-6 pb-6">
                  <div className="ml-8">
                    <p className="text-gray-700 leading-relaxed">
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