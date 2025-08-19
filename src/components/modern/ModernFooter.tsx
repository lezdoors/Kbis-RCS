import { Shield, Lock, CreditCard, FileCheck } from "lucide-react";

export const ModernFooter = () => {
  const trustBadges = [
    {
      icon: Shield,
      label: "SSL Certificate"
    },
    {
      icon: Lock,
      label: "RGPD Compliant"
    },
    {
      icon: CreditCard,
      label: "Paiement Sécurisé"
    },
    {
      icon: FileCheck,
      label: "Documents Certifiés"
    }
  ];

  const footerLinks = {
    services: [
      { label: "KBIS Standard", href: "#" },
      { label: "KBIS Express", href: "#" },
      { label: "KBIS Postal", href: "#" }
    ],
    support: [
      { label: "Centre d'aide", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Chat en direct", href: "#" },
      { label: "FAQ", href: "#" }
    ],
    legal: [
      { label: "Mentions légales", href: "#" },
      { label: "CGV", href: "#" },
      { label: "Politique RGPD", href: "#" },
      { label: "Cookies", href: "#" }
    ]
  };

  return (
    <footer className="bg-muted/30 border-t border-border">
      {/* Trust Section */}
      <div className="border-b border-border">
        <div className="container-modern py-12">
          <h3 className="text-xl font-semibold text-center text-foreground mb-8">
            Sécurité & Conformité
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {trustBadges.map((badge, index) => {
              const IconComponent = badge.icon;
              return (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-4 h-4 text-success" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {badge.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-modern py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="font-bold text-xl text-primary">
              KBIS Express
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Le service premium pour obtenir vos extraits KBIS rapidement et en toute sécurité.
            </p>
            <div className="text-sm text-foreground font-medium">
              Livraison garantie 24h
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Légal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container-modern py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 KBIS Express. Tous droits réservés.
            </p>
            <p className="text-sm text-foreground font-medium">
              Plus rapide que nos concurrents
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};