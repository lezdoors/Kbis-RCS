import { SecurityBadges } from "@/components/SecurityBadges";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Security Badges */}
        <div className="border-b border-gray-700 mb-12">
          <h3 className="text-center text-lg font-semibold mb-6 text-gray-300">
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
            <h4 className="font-semibold text-lg">RCS Express</h4>
            <p className="text-gray-400 text-sm">
              La plateforme la plus rapide pour créer votre entreprise en France.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="w-4 h-4 bg-current rounded-full inline-block"></span>
              <span>24h garanties</span>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/choisir-statut" className="hover:text-white transition-colors">
                  Création SASU
                </Link>
              </li>
              <li>
                <Link to="/choisir-statut" className="hover:text-white transition-colors">
                  Création SARL
                </Link>
              </li>
              <li>
                <Link to="/choisir-statut" className="hover:text-white transition-colors">
                  Création SCI
                </Link>
              </li>
              <li>
                <Link to="/choisir-statut" className="hover:text-white transition-colors">
                  Auto-entrepreneur
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
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
            <ul className="space-y-2 text-sm text-gray-400">
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
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 RCS Express. Tous droits réservés. Plus rapide que LegalPlace.</p>
        </div>
      </div>
    </footer>
  );
};