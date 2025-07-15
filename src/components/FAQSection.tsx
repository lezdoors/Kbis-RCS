import { useState } from "react";

export const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "Pourquoi choisir RCS Express plutôt que LegalPlace ?",
      answer: "Nous sommes 3x plus rapides (24h vs 72h), moins chers (129€ vs 199€), et notre plateforme moderne offre un suivi temps réel que nos concurrents n'ont pas. Plus de 300,000 entrepreneurs nous font déjà confiance."
    },
    {
      question: "Garantissez-vous vraiment la livraison en 24h ?",
      answer: "Oui, absolument. Si nous ne livrons pas votre KBIS en 24h, nous vous remboursons intégralement. C'est notre engagement qualité que nos concurrents ne peuvent pas tenir."
    },
    {
      question: "Votre plateforme est-elle vraiment plus moderne ?",
      answer: "Notre technologie 2025 (architecture cloud dernière génération) permet un suivi temps réel, des notifications instantanées et une sécurité bancaire. Nos concurrents utilisent encore des technologies 2015."
    },
    {
      question: "Comment puis-je suivre l'avancement de mon dossier ?",
      answer: "Contrairement aux autres plateformes, vous recevez des notifications en temps réel : SMS, email, et tableau de bord live. Fini l'attente sans nouvelles pendant des jours."
    },
    {
      question: "Vos prix sont-ils vraiment transparents ?",
      answer: "129€ TTC, point final. Aucun frais caché, aucun supplément surprise. Contrairement à nos concurrents qui ajoutent des frais en cours de route."
    },
    {
      question: "Que se passe-t-il si mon dossier est rejeté ?",
      answer: "Impossible. Nous garantissons 0% de rejet grâce à notre expertise. Si par miracle un rejet arrivait, nous corrigeons et redéposons gratuitement."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const highlightCompetitiveAdvantages = (text: string) => {
    const competitiveTerms = [
      '3x plus rapides',
      '24h vs 72h',
      'moins chers',
      '129€ vs 199€',
      'suivi temps réel',
      'remboursons intégralement',
      'technologie 2025',
      'notifications instantanées',
      'sécurité bancaire',
      'technologies 2015',
      'notifications en temps réel',
      '129€ TTC, point final',
      'Aucun frais caché',
      '0% de rejet',
      'redéposons gratuitement'
    ];

    let highlightedText = text;
    competitiveTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<span class="font-semibold text-green-700">$1</span>');
    });

    return highlightedText;
  };

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-3xl font-bold text-center mb-4">
            Questions fréquentes sur notre service
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Découvrez pourquoi nous surpassons nos concurrents
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 font-medium text-gray-900 flex justify-between items-center"
              >
                <span>{faq.question}</span>
                <span className="text-gray-500 text-xl">
                  {openFAQ === index ? '−' : '+'}
                </span>
              </button>
              {openFAQ === index && (
                <div className="p-4 bg-gray-50 text-gray-700 border-l-4 border-green-400">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: highlightCompetitiveAdvantages(faq.answer)
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};