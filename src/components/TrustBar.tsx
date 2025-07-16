import { CheckCircle, Star, Shield, Clock } from "lucide-react";

export const TrustBar = () => {
  return (
    <div className="bg-gray-50 border-b border-gray-200 py-2 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-sm text-gray-700 text-center flex items-center justify-center flex-wrap gap-4 md:gap-8">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>300,000+ entreprises créées</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>4.5/5 sur Trustpilot</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-4 h-4 text-blue-600" />
            <span>Certifié RGPD</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-orange-600" />
            <span>Livraison 24h</span>
          </div>
        </div>
      </div>
    </div>
  );
};