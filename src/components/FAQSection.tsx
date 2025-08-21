import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "Qu'est-ce qu'un extrait KBIS ?",
      answer: "Le KBIS est la carte d'identité officielle d'une entreprise française. Il prouve qu'elle est bien immatriculée au registre du commerce et contient toutes ses informations légales : raison sociale, adresse, dirigeants, capital social, etc."
    },
    {
      question: "Pourquoi payer alors que MonIdenum est gratuit ?",
      answer: "MonIdenum est souvent en panne, complexe à utiliser et réservé aux dirigeants. Notre service garantit une livraison rapide (2-4h) avec un support humain en français, même le week-end. Parfait quand vous êtes pressé ou que les sites officiels ne fonctionnent pas."
    },
    {
      question: "Le KBIS obtenu est-il valide partout ?",
      answer: "Oui, absolument ! Nous récupérons les extraits directement depuis les sources officielles (Infogreffe). Le KBIS que vous recevez a exactement la même valeur légale et est accepté par toutes les banques, administrations et partenaires commerciaux."
    },
    {
      question: "Dans quels délais vais-je recevoir mon KBIS ?",
      answer: "Standard : 4h maximum par email • Express : 2h maximum par email + SMS • Postal : 48h par courrier recommandé. Service disponible 7j/7, même le week-end."
    },
    {
      question: "Puis-je obtenir le KBIS d'une autre entreprise ?",
      answer: "Oui, le KBIS est un document public. Vous pouvez demander l'extrait KBIS de n'importe quelle entreprise française immatriculée au RCS. Il suffit de connaître le nom de l'entreprise ou son numéro SIREN."
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