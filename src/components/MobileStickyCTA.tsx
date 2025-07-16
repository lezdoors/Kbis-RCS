import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const MobileStickyCTA = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-primary text-white p-4 shadow-lg">
      <div className="safe-area-padding-bottom">
        <Button 
          onClick={() => navigate('/choisir-statut')}
          className="w-full bg-transparent hover:bg-white/10 text-white font-bold py-3 px-6 rounded-lg text-base transition-all duration-200 border border-white/20 min-h-[44px]"
        >
          Créer maintenant
        </Button>
      </div>
    </div>
  );
};