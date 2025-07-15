import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Building2, LogOut, User, CheckCircle, Clock, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        navigate('/login');
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          navigate('/login');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de se déconnecter. Veuillez réessayer.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès.",
      });
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Header */}
      <header className="header-administrative">
        <div className="container-administrative">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-soft">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-foreground">RCS Express</span>
                <span className="text-xs text-muted-foreground font-medium">Espace personnel</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-muted-foreground font-medium">{user?.email}</span>
              </div>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="btn-administrative-outline btn-touch"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Se déconnecter</span>
                <span className="sm:hidden">Sortir</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="section-administrative">
        <div className="container-administrative">
          {/* Hero Section */}
          <div className="mb-12 text-center space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Tableau de bord
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Bienvenue dans votre espace personnel RCS Express
            </p>
          </div>

          {/* Welcome Status */}
          <div className="mb-12">
            <div className="card-premium bg-gradient-to-r from-success/5 to-success/10 border-success/20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-success/20 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-success">Connexion sécurisée</h3>
                  <p className="text-sm text-success/80">
                    Vous êtes maintenant connecté à votre espace personnel
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <div className="card-premium group cursor-pointer" onClick={() => navigate('/choisir-statut')}>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-3xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Nouvelle démarche</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Commencer une nouvelle immatriculation au RCS
                  </p>
                </div>
                <Button 
                  className="w-full btn-administrative btn-touch"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/choisir-statut');
                  }}
                >
                  Commencer
                </Button>
              </div>
            </div>

            <div className="card-premium group cursor-pointer">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-3xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Mes dossiers</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Consulter l'état de vos démarches en cours
                  </p>
                </div>
                <Button 
                  className="w-full btn-administrative-outline btn-touch"
                  onClick={() => toast({
                    title: "Fonctionnalité à venir",
                    description: "Le suivi des dossiers sera bientôt disponible.",
                  })}
                >
                  Voir mes dossiers
                </Button>
              </div>
            </div>

            <div className="card-premium group cursor-pointer sm:col-span-2 lg:col-span-1">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-3xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Mon compte</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Gérer vos informations personnelles
                  </p>
                </div>
                <Button 
                  className="w-full btn-administrative-outline btn-touch"
                  onClick={() => toast({
                    title: "Fonctionnalité à venir",
                    description: "La gestion du compte sera bientôt disponible.",
                  })}
                >
                  Gérer mon compte
                </Button>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="card-premium">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Informations de connexion</h3>
                <p className="text-sm text-muted-foreground">
                  Détails de votre compte sécurisé
                </p>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-sm font-medium text-foreground">Adresse email</div>
                <div className="text-base text-muted-foreground font-medium bg-muted/50 px-4 py-3 rounded-xl">
                  {user?.email}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-foreground">Dernière connexion</div>
                <div className="text-base text-muted-foreground font-medium bg-muted/50 px-4 py-3 rounded-xl">
                  {user?.last_sign_in_at 
                    ? new Date(user.last_sign_in_at).toLocaleString('fr-FR')
                    : 'Première connexion'
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;