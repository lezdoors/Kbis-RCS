import { Shield, Lock, Database, CreditCard } from "lucide-react";

export const SecurityBadges = () => {
  const badges = [
    { icon: Lock, text: "SSL Certificate" },
    { icon: Shield, text: "RGPD Compliance" },
    { icon: Database, text: "Données sécurisées" },
    { icon: CreditCard, text: "Paiement sécurisé" }
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-6">
      {badges.map((badge, index) => {
        const IconComponent = badge.icon;
        return (
          <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
            <IconComponent className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700 font-medium">{badge.text}</span>
          </div>
        );
      })}
    </div>
  );
};