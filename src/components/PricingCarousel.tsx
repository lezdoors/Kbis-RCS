import { useState, useRef, useEffect } from "react";
import { Check, X, Star, Trophy } from "lucide-react";

interface Competitor {
  name: string;
  isOurs: boolean;
  price: string;
  priceDetail: string;
  features: Array<{
    name: string;
    value: string;
    highlight: boolean;
  }>;
}

interface PricingCarouselProps {
  competitors: Competitor[];
}

export const PricingCarousel = ({ competitors }: PricingCarouselProps) => {
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
    const cardWidth = scrollRef.current.offsetWidth;
    const scrollPosition = scrollRef.current.scrollLeft;
    const newIndex = Math.round(scrollPosition / cardWidth);
    setActiveIndex(Math.max(0, Math.min(newIndex, competitors.length - 1)));
    
    scrollRef.current.scrollTo({
      left: newIndex * cardWidth,
      behavior: 'smooth'
    });
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.offsetWidth;
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
    setActiveIndex(index);
  };

  const getTotalCost = (competitor: Competitor) => {
    switch (competitor.name) {
      case 'RCS Express': return '129€';
      case 'LegalPlace': return '~149€';
      case 'LegalStart': return '~149€';
      default: return competitor.price;
    }
  };

  return (
    <div className="lg:hidden">
      {/* Header */}
      <div className="text-center space-y-4 mb-8">
        <div className="inline-flex items-center space-x-2 bg-institutional/5 border border-institutional/20 rounded-full px-4 py-2">
          <Trophy className="w-4 h-4 text-institutional" />
          <span className="text-institutional font-medium text-xs tracking-wide">COMPARAISON MOBILE</span>
        </div>
        <h3 className="text-2xl font-bold text-foreground">Faites glisser pour comparer</h3>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Cards Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {competitors.map((competitor, index) => (
            <div 
              key={index}
              className="flex-none w-full snap-center px-4"
            >
              <div className={`bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 ${
                competitor.isOurs 
                  ? 'border-institutional shadow-institutional/20 shadow-xl' 
                  : 'border-gray-200 hover:border-gray-300'
              } ${activeIndex === index ? 'scale-105' : 'scale-100'}`}>
                
                {/* Header */}
                <div className={`relative p-6 text-center rounded-t-2xl ${
                  competitor.isOurs 
                    ? 'bg-gradient-to-br from-institutional to-institutional/90 text-white' 
                    : 'bg-gradient-to-br from-navy to-navy/90 text-white'
                }`}>
                  {competitor.isOurs && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-white text-institutional text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                        ⭐ RECOMMANDÉ
                      </div>
                    </div>
                  )}
                  
                  <h3 className="font-bold text-xl mb-3">{competitor.name}</h3>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold">{competitor.price}</div>
                    <div className="text-sm opacity-90">{competitor.priceDetail}</div>
                  </div>
                </div>

                {/* Features */}
                <div className="p-4 space-y-3">
                  {competitor.features.map((feature, fIndex) => (
                    <div 
                      key={fIndex} 
                      className={`flex items-start justify-between p-3 rounded-xl ${
                        feature.highlight 
                          ? 'bg-institutional/5 border border-institutional/20' 
                          : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start space-x-2 flex-1">
                        {feature.highlight && (
                          <Star className="w-4 h-4 text-institutional mt-0.5 flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium text-foreground leading-tight">
                          {feature.name}
                        </span>
                      </div>
                      <div className={`text-sm font-semibold text-right ml-2 ${
                        feature.value.startsWith('✓') ? 'text-institutional' :
                        feature.value.startsWith('✗') ? 'text-red-500' :
                        competitor.isOurs ? 'text-institutional' : 'text-muted-foreground'
                      }`}>
                        {feature.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total Cost */}
                <div className={`p-6 rounded-b-2xl border-t-2 ${
                  competitor.isOurs 
                    ? 'bg-institutional text-white border-institutional/20' 
                    : 'bg-gray-100 border-gray-200'
                }`}>
                  <div className="text-center space-y-2">
                    <div className="text-sm font-medium opacity-90">Coût total réel</div>
                    <div className="text-2xl font-bold">{getTotalCost(competitor)}</div>
                    <div className="text-sm opacity-75">
                      {competitor.isOurs ? 'Prix final' : 'Avec tous les frais'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicators */}
        <div className="flex justify-center space-x-2 mt-6">
          {competitors.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? 'bg-institutional scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Aller au concurrent ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Hint */}
        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">
            Faites glisser ou appuyez sur les points pour naviguer
          </p>
        </div>
      </div>
    </div>
  );
};