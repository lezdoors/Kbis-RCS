import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Building2, ArrowLeft } from "lucide-react";
import MagicLinkLogin from "@/components/MagicLinkLogin";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          navigate('/dashboard');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <section className="section-administrative">
        <div className="container-administrative">
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="w-full max-w-md animate-fade-in">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-premium">
                  Connexion sécurisée
                </h1>
                <p className="text-subtitle">
                  Accédez à votre espace personnel pour suivre vos démarches
                </p>
              </div>

              <MagicLinkLogin />

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Première visite ?{" "}
                  <Button
                    variant="link"
                    className="text-primary hover:text-primary/80 p-0 h-auto"
                    onClick={() => navigate('/choisir-statut')}
                  >
                    Commencer une démarche
                  </Button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50">
        <div className="container-administrative py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>Service sécurisé et conforme aux standards de l'administration française</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;