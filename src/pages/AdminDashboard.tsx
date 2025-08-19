import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Package, 
  DollarSign, 
  Clock, 
  AlertCircle,
  MessageSquare,
  TrendingUp,
  Filter,
  Search,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  RefreshCw
} from "lucide-react";
import { Header } from "@/components/Header";
import { AdminOrderManagement } from "@/components/admin/AdminOrderManagement";
import { AdminAnalytics } from "@/components/admin/AdminAnalytics";
import { AdminCustomerSupport } from "@/components/admin/AdminCustomerSupport";
import { AdminOverview } from "@/components/admin/AdminOverview";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [hasAdminAccess, setHasAdminAccess] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    checkAdminAccess();
  }, [navigate]);

  const checkAdminAccess = async () => {
    try {
      setLoading(true);
      
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }

      setUser(session.user);

      // Check if user has admin role
      const { data: roles, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin');

      if (error) {
        console.error('Error checking admin role:', error);
        toast({
          title: "Erreur d'accès",
          description: "Impossible de vérifier vos permissions d'administrateur.",
          variant: "destructive"
        });
        navigate('/dashboard');
        return;
      }

      if (!roles || roles.length === 0) {
        toast({
          title: "Accès refusé",
          description: "Vous n'avez pas les permissions d'administrateur.",
          variant: "destructive"
        });
        navigate('/dashboard');
        return;
      }

      setHasAdminAccess(true);
    } catch (error) {
      console.error('Error checking admin access:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la vérification des accès.",
        variant: "destructive"
      });
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Vérification des permissions...</p>
        </div>
      </div>
    );
  }

  if (!hasAdminAccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Accès réservé aux administrateurs.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Administration
              </h1>
              <p className="text-muted-foreground mt-2">
                Gestion des commandes et monitoring du service
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
              >
                Tableau de bord utilisateur
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
              >
                Se déconnecter
              </Button>
            </div>
          </div>
        </div>

        {/* Admin Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="orders">Gestion des commandes</TabsTrigger>
            <TabsTrigger value="support">Support client</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <AdminOverview />
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <AdminOrderManagement />
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <AdminCustomerSupport />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AdminAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;