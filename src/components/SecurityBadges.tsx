export const SecurityBadges = () => {
  const badges = [
    { icon: "🔒", text: "SSL Certificate" },
    { icon: "🛡️", text: "RGPD Compliance" },
    { icon: "🔐", text: "Données sécurisées" },
    { icon: "💳", text: "Paiement sécurisé" }
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-6">
      {badges.map((badge, index) => (
        <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
          <span className="text-lg">{badge.icon}</span>
          <span className="text-sm text-gray-700 font-medium">{badge.text}</span>
        </div>
      ))}
    </div>
  );
};