import { Check, X, Clock, Shield, Phone, Zap, Star, Trophy } from "lucide-react";
import { PricingCarousel } from "./PricingCarousel";

export const PricingComparison = () => {
  const competitors = [
    {
      name: "RCS Express",
      isOurs: true,
      price: "129€",
      priceDetail: "Tout inclus, pas de surprise",
      features: [
        { name: "Délai de traitement", value: "24h garanties", highlight: true },
        { name: "Suivi temps réel", value: "✓ Notifications instantanées", highlight: true },
        { name: "Support expert", value: "✓ Conseillers juridiques", highlight: true },
        { name: "Frais cachés", value: "✗ Aucun", highlight: true },
        { name: "Garantie remboursement", value: "✓ 100% satisfait", highlight: false },
        { name: "Documents inclus", value: "✓ Tous", highlight: false },
        { name: "Modifications gratuites", value: "✓ Illimitées", highlight: false },
        { name: "KBIS express", value: "✓ Livraison immédiate", highlight: true }
      ]
    },
    {
      name: "LegalPlace",
      isOurs: false,
      price: "99€",
      priceDetail: "+ frais cachés (~50€)",
      features: [
        { name: "Délai de traitement", value: "3-5 jours", highlight: false },
        { name: "Suivi temps réel", value: "✗ Emails sporadiques", highlight: false },
        { name: "Support expert", value: "✗ Support basique", highlight: false },
        { name: "Frais cachés", value: "✓ Nombreux", highlight: false },
        { name: "Garantie remboursement", value: "✓ Limitée", highlight: false },
        { name: "Documents inclus", value: "✗ Payants", highlight: false },
        { name: "Modifications gratuites", value: "✗ Payantes", highlight: false },
        { name: "KBIS express", value: "✗ Standard", highlight: false }
      ]
    },
    {
      name: "LegalStart",
      isOurs: false,
      price: "79€",
      priceDetail: "+ options obligatoires (~70€)",
      features: [
        { name: "Délai de traitement", value: "4-7 jours", highlight: false },
        { name: "Suivi temps réel", value: "✗ Pas de suivi", highlight: false },
        { name: "Support expert", value: "✗ FAQ uniquement", highlight: false },
        { name: "Frais cachés", value: "✓ Très nombreux", highlight: false },
        { name: "Garantie remboursement", value: "✗ Aucune", highlight: false },
        { name: "Documents inclus", value: "✗ En option", highlight: false },
        { name: "Modifications gratuites", value: "✗ Payantes", highlight: false },
        { name: "KBIS express", value: "✗ Impossible", highlight: false }
      ]
    }
  ];

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-slate-50 py-24 lg:py-32" id="tarifs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium Header */}
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center space-x-2 bg-institutional/5 border border-institutional/20 rounded-full px-6 py-2 mb-4">
            <Trophy className="w-4 h-4 text-institutional" />
            <span className="text-institutional font-medium text-sm tracking-wide">COMPARAISON TRANSPARENTE</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Pourquoi nous choisir ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Comparaison objective de la valeur totale, pas seulement du prix
          </p>
        </div>

        {/* Mobile Carousel */}
        <PricingCarousel competitors={competitors} />

        {/* Desktop Comparison Table */}
        <div className="hidden lg:block bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-4 bg-gradient-to-r from-navy via-navy/95 to-navy text-white">
            <div className="p-6 lg:p-8">
              <h3 className="font-bold text-lg lg:text-xl">Critères de comparaison</h3>
            </div>
            {competitors.map((competitor, index) => (
              <div 
                key={index} 
                className={`p-6 lg:p-8 text-center relative ${
                  competitor.isOurs ? 'bg-institutional' : ''
                }`}
              >
                {competitor.isOurs && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-white text-institutional text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                      ⭐ RECOMMANDÉ
                    </div>
                  </div>
                )}
                <h3 className="font-bold text-lg lg:text-xl mb-2">{competitor.name}</h3>
                <div className="space-y-1">
                  <div className="text-2xl lg:text-3xl font-bold">{competitor.price}</div>
                  <div className="text-sm opacity-90">{competitor.priceDetail}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Features Comparison */}
          <div className="divide-y divide-gray-100">
            {competitors[0].features.map((_, featureIndex) => (
              <div key={featureIndex} className="grid grid-cols-4">
                {/* Feature Name */}
                <div className={`p-6 font-semibold text-foreground bg-gray-50/50 ${
                  competitors[0].features[featureIndex].highlight ? 'bg-institutional/5' : ''
                }`}>
                  <div className="flex items-center space-x-2">
                    {competitors[0].features[featureIndex].highlight && (
                      <Star className="w-4 h-4 text-institutional" />
                    )}
                    <span>{competitors[0].features[featureIndex].name}</span>
                  </div>
                </div>

                {/* Values for each competitor */}
                {competitors.map((competitor, compIndex) => (
                  <div 
                    key={compIndex} 
                    className={`p-6 text-center ${
                      competitor.isOurs ? 'bg-institutional/5' : ''
                    } ${competitors[0].features[featureIndex].highlight ? 'bg-opacity-75' : ''}`}
                  >
                    <div className={`font-medium ${
                      competitor.features[featureIndex].value.startsWith('✓') ? 'text-institutional' :
                      competitor.features[featureIndex].value.startsWith('✗') ? 'text-red-500' :
                      competitor.isOurs ? 'text-institutional font-bold' : 'text-muted-foreground'
                    }`}>
                      {competitor.features[featureIndex].value}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Total Value Row */}
          <div className="grid grid-cols-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t-2 border-gray-200">
            <div className="p-6 lg:p-8 font-bold text-foreground text-lg">
              Coût total réel
            </div>
            {competitors.map((competitor, index) => (
              <div 
                key={index} 
                className={`p-6 lg:p-8 text-center ${
                  competitor.isOurs ? 'bg-institutional text-white' : ''
                }`}
              >
                <div className="space-y-2">
                  <div className={`text-2xl lg:text-3xl font-bold ${
                    competitor.isOurs ? 'text-white' : 'text-foreground'
                  }`}>
                    {competitor.name === 'RCS Express' ? '129€' :
                     competitor.name === 'LegalPlace' ? '~149€' : '~149€'}
                  </div>
                  <div className={`text-sm ${
                    competitor.isOurs ? 'text-white/90' : 'text-muted-foreground'
                  }`}>
                    {competitor.isOurs ? 'Prix final' : 'Avec tous les frais'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium CTA */}
        <div className="text-center mt-16">
          <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-12 shadow-lg max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-institutional/10 rounded-2xl flex items-center justify-center mx-auto">
                <Trophy className="w-8 h-8 text-institutional" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                La meilleure valeur du marché
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Plus rapide, moins cher au final, avec un service premium inclus
              </p>
              <button className="bg-institutional hover:bg-institutional/90 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Créer mon entreprise - 129€ tout inclus
              </button>
              <p className="text-sm text-muted-foreground">
                Garantie 24h ou remboursé • Plus de 300,000 entrepreneurs nous font confiance
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};