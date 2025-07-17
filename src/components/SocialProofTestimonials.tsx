import { Quote, Star, Building2, TrendingUp, Award, Users } from "lucide-react";

export const SocialProofTestimonials = () => {
  const testimonials = [
    {
      name: "Marina Dubois",
      company: "Dubois Consulting",
      role: "Fondatrice",
      structure: "SASU",
      quote: "RCS Express a transformé ma création d'entreprise. En 18h, j'avais ma SASU opérationnelle et mon KBIS en poche. Un service d'exception.",
      result: "SASU créée en 18h",
      rating: 5,
      image: "/lovable-uploads/8ccf8709-45bb-4bb5-bc25-14595b39de8d.png"
    },
    {
      name: "Thomas Moreau",
      company: "TechFlow Solutions",
      role: "CEO",
      structure: "SAS",
      quote: "La rapidité et la qualité du service m'ont bluffé. Nos associés et moi avons pu nous concentrer sur notre produit plutôt que sur la paperasse.",
      result: "SAS + 3 associés en 24h",
      rating: 5,
      image: "/lovable-uploads/44d3fbcd-ea82-40a6-81b1-53e0f643dd45.png"
    },
    {
      name: "Sophie Laurent",
      company: "Laurent & Associés",
      role: "Directrice",
      structure: "SARL",
      quote: "Après avoir testé 3 concurrents, RCS Express se démarque par sa transparence et son accompagnement personnalisé. Je recommande les yeux fermés.",
      result: "SARL familiale validée",
      rating: 5,
      image: "/lovable-uploads/baefcc3d-696b-4676-a726-7234c1b77f2e.png"
    }
  ];

  return (
    <section className="bg-white py-24 lg:py-32" id="temoignages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Magazine-style Header */}
        <div className="text-center space-y-8 mb-20">
          <div className="inline-flex items-center space-x-3 bg-institutional/5 border border-institutional/20 rounded-full px-8 py-3">
            <Award className="w-5 h-5 text-institutional" />
            <span className="text-institutional font-semibold text-sm tracking-wide uppercase">
              Témoignages Clients
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight max-w-4xl mx-auto leading-tight">
            Ils ont créé leur entreprise avec nous
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Découvrez les histoires de réussite de nos 300,000+ entrepreneurs
          </p>
        </div>

        {/* Premium Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {testimonials.map((testimonial, index) => (
            <article 
              key={index}
              className="group bg-gradient-to-br from-gray-50 via-white to-gray-50 border border-gray-100 rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Magazine-style Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="space-y-4">
                  {/* Star Rating */}
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  {/* Result Badge */}
                  <div className="inline-flex items-center space-x-2 bg-institutional/10 border border-institutional/20 rounded-full px-4 py-2">
                    <TrendingUp className="w-4 h-4 text-institutional" />
                    <span className="text-institutional font-semibold text-xs tracking-wide">
                      {testimonial.result}
                    </span>
                  </div>
                </div>

                {/* Unified 3D Illustration Treatment */}
                <div className="relative">
                  <div className="illustration-3d-compact w-16 h-16 group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src={testimonial.image}
                      alt={`Illustration pour ${testimonial.company}`}
                      className="w-full h-full object-contain"
                    />
                    <div className="gallery-signature">
                      RCS
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="space-y-6 mb-8">
                <Quote className="w-8 h-8 text-institutional/30" />
                <blockquote className="text-lg text-foreground leading-relaxed font-medium italic">
                  "{testimonial.quote}"
                </blockquote>
              </div>

              {/* Attribution - Magazine Style */}
              <footer className="border-t border-gray-100 pt-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <cite className="text-foreground font-bold text-lg not-italic">
                        {testimonial.name}
                      </cite>
                      <p className="text-muted-foreground text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-foreground font-semibold text-sm">
                        {testimonial.company}
                      </p>
                      <p className="text-navy text-xs font-medium bg-navy/10 px-3 py-1 rounded-full">
                        {testimonial.structure}
                      </p>
                    </div>
                  </div>
                </div>
              </footer>
            </article>
          ))}
        </div>

        {/* Premium CTA Section */}
        <div className="bg-gradient-to-r from-navy via-navy/95 to-navy rounded-3xl p-8 lg:p-12 text-center shadow-2xl">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Unified 3D Couple Illustration */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-white/10 rounded-3xl blur-2xl"></div>
              <div className="illustration-3d-consistent relative bg-white/20 rounded-3xl p-6 backdrop-blur-sm">
                <img 
                  src="/lovable-uploads/8ccf8709-45bb-4bb5-bc25-14595b39de8d.png"
                  alt="Couple d'entrepreneurs - Illustration 3D de réussite"
                  className="w-20 h-20 mx-auto object-contain"
                />
                <div className="gallery-signature text-white/60">
                  RCS COLLECTION
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                Rejoignez les entrepreneurs qui nous font confiance
              </h3>
              <p className="text-xl text-navy-foreground/90 max-w-2xl mx-auto leading-relaxed">
                Plus de 300,000 entreprises créées avec un taux de satisfaction de 98%
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
                <button className="bg-white text-navy hover:bg-gray-50 font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Créer mon entreprise maintenant
                </button>
                <div className="flex items-center space-x-2 text-white/90">
                  <Users className="w-5 h-5" />
                  <span className="font-medium text-sm">+3,000 créations ce mois</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};