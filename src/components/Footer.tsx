import { SecurityBadges } from "@/components/SecurityBadges";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-brand-blue text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Security Badges */}
        <div className="border-b border-white/20 mb-12">
          <h3 className="text-center text-lg font-semibold mb-6">
            Sécurité & Conformité
          </h3>
          <div className="mb-8">
            <SecurityBadges />
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="mb-4">
              <img 
                src="/lovable-uploads/2ada5f22-8dd2-405a-9d73-d2ca20da8cf2.png" 
                alt="Créez • Protégez • Lancez"
                className="h-8 w-auto brightness-0 invert"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                  (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
                }}
              />
              <h4 className="font-semibold text-lg hidden">Créez • Protégez • Lancez</h4>
            </div>
            <p className="text-white/70 text-sm">
              Votre partenaire de confiance pour l'obtention rapide et sécurisée de vos documents KBIS.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <span className="w-4 h-4 bg-current rounded-full inline-block"></span>
              <span>24h garanties</span>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold">Services</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link to="/kbis-standard" className="hover:text-white transition-colors">
                  KBIS Standard
                </Link>
              </li>
              <li>
                <Link to="/kbis-express" className="hover:text-white transition-colors">
                  KBIS Express
                </Link>
              </li>
              <li>
                <Link to="/kbis-postal" className="hover:text-white transition-colors">
                  KBIS Postal
                </Link>
              </li>
              <li>
                <Link to="/recherche-entreprise" className="hover:text-white transition-colors">
                  Recherche d'entreprise
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link to="/commencer" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Chat en direct
                </Link>
              </li>
              <li>
                <Link to="/#faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold">Légal</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link to="/mentions-legales" className="hover:text-white transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/cgv" className="hover:text-white transition-colors">
                  CGV
                </Link>
              </li>
              <li>
                <Link to="/politique-rgpd" className="hover:text-white transition-colors">
                  Politique RGPD
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-white transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8 text-center text-sm text-white/70">
          <p>&copy; 2024 KBIS Express. Tous droits réservés. Plus rapide que LegalPlace.</p>
        </div>
      </div>
    </footer>
  );
};