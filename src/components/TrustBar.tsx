import { CheckCircle, Star, Shield, Clock } from "lucide-react";

export const TrustBar = () => {
  return (
    <div className="bg-gray-50 border-b border-gray-200 py-3 px-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-base text-gray-700 text-center flex items-center justify-center flex-wrap gap-6 md:gap-12">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium">300,000+ entreprises créées</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="font-medium">4.5/5 sur Trustpilot</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Certifié RGPD</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <span className="font-medium">Livraison 24h</span>
          </div>
        </div>
      </div>
    </div>
  );
};