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
      {/* Header */}
      <header className="header-administrative">
        <div className="container-administrative">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold text-foreground">RCS Express</span>
                <span className="text-xs text-muted-foreground">Espace personnel</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {user?.email}
              </span>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="btn-administrative-outline"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Se déconnecter
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="section-administrative">
        <div className="container-administrative">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Tableau de bord
            </h1>
            <p className="text-muted-foreground">
              Bienvenue dans votre espace personnel RCS Express
            </p>
          </div>

          {/* Welcome Alert */}
          <Alert className="mb-8 border-success bg-success/10">
            <CheckCircle className="h-4 w-4 text-success" />
            <AlertDescription className="text-success">
              <strong>Connexion réussie !</strong> Vous êtes maintenant connecté à votre espace sécurisé.
            </AlertDescription>
          </Alert>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="card-administrative">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-sm flex items-center justify-center mb-2">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Nouvelle démarche</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Commencer une nouvelle immatriculation au RCS
                </p>
                <Button 
                  className="w-full btn-administrative"
                  onClick={() => navigate('/choisir-statut')}
                >
                  Commencer
                </Button>
              </CardContent>
            </Card>

            <Card className="card-administrative">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-sm flex items-center justify-center mb-2">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Mes dossiers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Consulter l'état de vos démarches en cours
                </p>
                <Button 
                  className="w-full btn-administrative-outline"
                  onClick={() => toast({
                    title: "Fonctionnalité à venir",
                    description: "Le suivi des dossiers sera bientôt disponible.",
                  })}
                >
                  Voir mes dossiers
                </Button>
              </CardContent>
            </Card>

            <Card className="card-administrative">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-sm flex items-center justify-center mb-2">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Mon compte</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Gérer vos informations personnelles
                </p>
                <Button 
                  className="w-full btn-administrative-outline"
                  onClick={() => toast({
                    title: "Fonctionnalité à venir",
                    description: "La gestion du compte sera bientôt disponible.",
                  })}
                >
                  Gérer mon compte
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* User Info */}
          <Card className="card-administrative">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Informations de connexion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Adresse email</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Dernière connexion</p>
                  <p className="text-sm text-muted-foreground">
                    {user?.last_sign_in_at 
                      ? new Date(user.last_sign_in_at).toLocaleString('fr-FR')
                      : 'Première connexion'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;