import { useState, useRef, useEffect } from "react";
import { CheckCircle, Star, Building2, Users, FileText, TrendingUp, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LegalStructure {
  name: string;
  fullName: string;
  description: string;
  icon: any;
  illustration: string;
  advantages: string[];
  idealFor: string;
  popularity: string;
  isRecommended: boolean;
}

interface LegalStructuresCarouselProps {
  structures: LegalStructure[];
}

export const LegalStructuresCarousel = ({ structures }: LegalStructuresCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startX.current = e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.touches[0].pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - startX.current) * 2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    snapToCard();
  };

  const snapToCard = () => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.children[0]?.clientWidth || 0;
    const gap = 16; // 1rem gap
    const scrollPosition = scrollRef.current.scrollLeft;
    const newIndex = Math.round(scrollPosition / (cardWidth + gap));
    setActiveIndex(Math.max(0, Math.min(newIndex, structures.length - 1)));
    
    scrollRef.current.scrollTo({
      left: newIndex * (cardWidth + gap),
      behavior: 'smooth'
    });
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.children[0]?.clientWidth || 0;
    const gap = 16; // 1rem gap
    scrollRef.current.scrollTo({
      left: index * (cardWidth + gap),
      behavior: 'smooth'
    });
    setActiveIndex(index);
  };

  // Update active index based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current || isDragging) return;
      const cardWidth = scrollRef.current.children[0]?.clientWidth || 0;
      const gap = 16;
      const scrollPosition = scrollRef.current.scrollLeft;
      const newIndex = Math.round(scrollPosition / (cardWidth + gap));
      setActiveIndex(Math.max(0, Math.min(newIndex, structures.length - 1)));
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll, { passive: true });
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [isDragging, structures.length]);

  return (
    <div className="lg:hidden">
      {/* Header */}
      <div className="text-center space-y-4 mb-8 px-4">
        <h3 className="text-2xl font-bold text-foreground">Choisissez votre structure</h3>
        <p className="text-muted-foreground">Faites glisser pour découvrir toutes les options</p>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Cards Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide gap-4 px-4 pb-2"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            scrollSnapType: 'x mandatory'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {structures.map((structure, index) => {
            const IconComponent = structure.icon;
            return (
              <div 
                key={index}
                className="flex-none w-80 snap-center"
                style={{ scrollSnapAlign: 'center' }}
              >
                <div className={`group relative border-0 shadow-lg hover:shadow-2xl bg-white rounded-3xl p-6 transition-all duration-500 h-full ${
                  structure.isRecommended ? 'ring-2 ring-institutional/20 bg-gradient-to-br from-white to-institutional/5' : ''
                } ${activeIndex === index ? 'scale-105 shadow-2xl' : 'scale-100'}`}>
                  
                  {/* Recommended Badge */}
                  {structure.isRecommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-institutional text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                        ⭐ RECOMMANDÉ
                      </div>
                    </div>
                  )}

                  {/* 3D Illustration */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 relative">
                      <div className="illustration-3d-compact absolute inset-0">
                        <img 
                          src={structure.illustration}
                          alt={`Illustration 3D pour ${structure.name}`}
                          className="w-full h-full object-contain"
                        />
                        <div className="gallery-signature">
                          RCS COLLECTION
                        </div>
                      </div>
                    </div>
                    
                    {/* Icon overlay */}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-navy rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Header */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant="outline" 
                        className={`text-navy border-navy/30 bg-navy/5 font-bold text-lg px-4 py-1 ${
                          structure.isRecommended ? 'bg-institutional/10 border-institutional/30 text-institutional' : ''
                        }`}
                      >
                        {structure.name}
                      </Badge>
                      <div className="text-xs text-yellow-500 font-medium">
                        {structure.popularity}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-lg font-bold text-foreground leading-tight">
                        {structure.fullName}
                      </h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {structure.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-institutional" />
                        <span className="text-sm font-medium text-institutional">
                          {structure.idealFor}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Advantages */}
                  <div className="space-y-4 mb-6">
                    <h5 className="font-bold text-foreground text-sm border-b border-gray-100 pb-2">
                      Avantages clés :
                    </h5>
                    <ul className="space-y-3">
                      {structure.advantages.slice(0, 3).map((advantage, advIndex) => (
                        <li key={advIndex} className="flex items-start space-x-3 group/item">
                          <div className="w-5 h-5 bg-institutional/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-institutional/20 transition-colors duration-200">
                            <CheckCircle className="w-3 h-3 text-institutional" />
                          </div>
                          <span className="text-sm text-muted-foreground leading-relaxed">
                            {advantage}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="pt-4 border-t border-gray-100">
                    <button className="w-full text-navy hover:text-institutional font-medium text-sm py-3 hover:bg-navy/5 rounded-lg transition-all duration-200 touch-manipulation">
                      En savoir plus →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fade edges for visual hint */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />
      </div>

      {/* Scroll Indicators */}
      <div className="flex justify-center space-x-2 mt-6">
        {structures.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 touch-manipulation ${
              activeIndex === index 
                ? 'bg-institutional scale-150' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Aller à la structure ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Hint */}
      <div className="text-center mt-4 px-4">
        <p className="text-xs text-muted-foreground">
          Faites glisser ou appuyez sur les points pour naviguer • {structures.length} structures disponibles
        </p>
      </div>
    </div>
  );
};