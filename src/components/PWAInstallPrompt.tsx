import { useEffect, useState } from 'react';

interface PWAInstallPromptProps {
  onInstall?: () => void;
  onCancel?: () => void;
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallPrompt = ({ onInstall, onCancel }: PWAInstallPromptProps) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      onInstall?.();
    } else {
      onCancel?.();
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    onCancel?.();
  };

  if (!showInstallPrompt) return null;

  return (
    <div 
      className="fixed bottom-4 left-4 right-4 bg-white border border-gray-200 rounded-xl p-4 shadow-lg z-50 md:left-auto md:right-4 md:max-w-sm"
      role="dialog"
      aria-labelledby="install-prompt-title"
      aria-describedby="install-prompt-description"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <img 
            src="/lovable-uploads/0bd61b06-875b-4bde-82a0-31d5601427ff.png" 
            alt="RCS Express" 
            className="w-12 h-12 rounded-lg"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 id="install-prompt-title" className="font-semibold text-gray-900 text-sm">
            Installer RCS Express
          </h3>
          <p id="install-prompt-description" className="text-gray-600 text-sm mt-1">
            Accédez rapidement à vos démarches depuis votre écran d'accueil
          </p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleInstallClick}
              className="btn-touch bg-primary text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Installer l'application RCS Express"
            >
              Installer
            </button>
            <button
              onClick={handleDismiss}
              className="btn-touch bg-gray-100 text-gray-700 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              aria-label="Ne pas installer maintenant"
            >
              Plus tard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};