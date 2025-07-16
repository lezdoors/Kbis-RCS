interface GuaranteeBadgeProps {
  text: string;
  className?: string;
}

import { CheckCircle } from "lucide-react";

export const GuaranteeBadge = ({ text, className = "" }: GuaranteeBadgeProps) => {
  return (
    <div className={`inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium ${className}`}>
      <CheckCircle className="w-4 h-4 text-green-600" />
      <span>{text}</span>
    </div>
  );
};

export const GuaranteeSection = () => {
  const guarantees = [
    "Livraison en 24h ou remboursé",
    "Aucun rejet du greffe garanti",
    "Support gratuit pendant 30 jours", 
    "Modification gratuite en cas d'erreur"
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
      {guarantees.map((guarantee, index) => (
        <GuaranteeBadge key={index} text={guarantee} />
      ))}
    </div>
  );
};