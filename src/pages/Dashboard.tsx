import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  Building2, 
  User, 
  Package, 
  Download, 
  MessageSquare, 
  Settings,
  CreditCard,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  DollarSign,
  Receipt,
  Bell,
  Shield,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ArrowUp,
  ArrowDown,
  Filter,
  Search,
  Eye,
  Star,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>({ email: 'demo@example.com' }); // Mock user
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data for offline development
  const [profile, setProfile] = useState<any>({
    first_name: 'Demo',
    last_name: 'User',
    phone: '01 23 45 67 89',
    company_name: 'Demo Company',
    job_title: 'CEO',
    notifications_enabled: true,
    marketing_emails: false
  });
  
  const [demandes, setDemandes] = useState<any[]>([
    {
      id: '1',
      nom_entreprise: 'Mon Entreprise SARL',
      type_entreprise: 'SARL',
      ville: 'Paris',
      status: 'processing',
      created_at: new Date().toISOString()
    }
  ]);
  
  const [orders, setOrders] = useState<any[]>([
    {
      id: '1',
      order_number: 'RCS-2024-001',
      amount: 129,
      status: 'completed',
      service_type: 'Creation SARL',
      created_at: new Date().toISOString()
    }
  ]);
  
  const [supportTickets, setSupportTickets] = useState<any[]>([]);
  const [billingInfo, setBillingInfo] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  
  // Form states
  const [profileForm, setProfileForm] = useState({
    first_name: 'Demo',
    last_name: 'User',
    phone: '01 23 45 67 89',
    company_name: 'Demo Company',
    job_title: 'CEO',
    notifications_enabled: true,
    marketing_emails: false
  });
  
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    description: '',
    category: 'general',
    priority: 'medium'
  });
  
  const [billingForm, setBillingForm] = useState({
    company_name: '',
    billing_address: '',
    vat_number: '',
    payment_method: 'card',
    is_company: false
  });

  useEffect(() => {
    // Mock authentication check
    const initializeDashboard = async () => {
      try {
        setLoading(false);
        
        // Load data from localStorage if available
        const savedProfile = localStorage.getItem('dashboard_profile');
        if (savedProfile) {
          const parsedProfile = JSON.parse(savedProfile);
          setProfile(parsedProfile);
          setProfileForm(parsedProfile);
        }
      } catch (error) {
        console.error('Error initializing dashboard:', error);
        toast({
          title: "Mode hors ligne",
          description: "Fonctionnement en mode démonstration",
        });
      }
    };

    initializeDashboard();
  }, [navigate, toast]);

  const handleLogout = async () => {
    // Mock logout
    navigate('/login');
  };

  const saveProfile = async () => {
    try {
      // Save to localStorage for offline development
      localStorage.setItem('dashboard_profile', JSON.stringify(profileForm));
      setProfile(profileForm);

      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été sauvegardées localement.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le profil.",
        variant: "destructive"
      });
    }
  };

  const createSupportTicket = async () => {
    try {
      // Mock ticket creation
      const newTicket = {
        id: crypto.randomUUID(),
        ...ticketForm,
        status: 'open',
        created_at: new Date().toISOString()
      };
      
      setSupportTickets(prev => [newTicket, ...prev]);

      toast({
        title: "Ticket créé",
        description: "Votre demande de support a été enregistrée localement.",
      });
      
      setTicketForm({
        subject: '',
        description: '',
        category: 'general',
        priority: 'medium'
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer le ticket de support.",
        variant: "destructive"
      });
    }
  };

  const saveBillingInfo = async () => {
    try {
      // Save to localStorage for offline development
      localStorage.setItem('billing_info', JSON.stringify(billingForm));
      setBillingInfo(billingForm);

      toast({
        title: "Informations de facturation mises à jour",
        description: "Vos données de facturation ont été sauvegardées localement.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les informations de facturation.",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-primary-light text-primary';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement du tableau de bord...</p>
        </div>
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
                Tableau de bord
              </h1>
              <p className="text-muted-foreground mt-2">
                Bienvenue, {profile?.first_name || user?.email} (Mode démonstration)
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/choisir-statut')}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Nouvelle demande
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Se déconnecter
              </Button>
            </div>
          </div>
        </div>

        {/* Offline Notice */}
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Mode hors ligne activé - Les données sont stockées localement et ne seront pas persistées.
          </AlertDescription>
        </Alert>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="orders">Commandes</TabsTrigger>
            <TabsTrigger value="progress">Suivi</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="billing">Facturation</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Demandes totales</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{demandes.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {demandes.filter(d => d.status === 'completed').length} terminées
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Commandes</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{orders.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {orders.filter(o => o.status === 'completed').length} payées
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tickets de support</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{supportTickets.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {supportTickets.filter(t => t.status === 'open').length} ouverts
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Documents</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{documents.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Téléchargements disponibles
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {demandes.slice(0, 5).map((demande) => (
                    <div key={demande.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{demande.nom_entreprise || 'Nouvelle demande'}</p>
                          <p className="text-sm text-muted-foreground">
                            {demande.type_entreprise} • {demande.ville}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(demande.status)}>
                        {demande.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name">Prénom</Label>
                    <Input
                      id="first_name"
                      value={profileForm.first_name}
                      onChange={(e) => setProfileForm({...profileForm, first_name: e.target.value})}
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div>
                    <Label htmlFor="last_name">Nom</Label>
                    <Input
                      id="last_name"
                      value={profileForm.last_name}
                      onChange={(e) => setProfileForm({...profileForm, last_name: e.target.value})}
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                      placeholder="Votre téléphone"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company_name">Nom de l'entreprise</Label>
                    <Input
                      id="company_name"
                      value={profileForm.company_name}
                      onChange={(e) => setProfileForm({...profileForm, company_name: e.target.value})}
                      placeholder="Nom de votre entreprise"
                    />
                  </div>
                  <div>
                    <Label htmlFor="job_title">Poste</Label>
                    <Input
                      id="job_title"
                      value={profileForm.job_title}
                      onChange={(e) => setProfileForm({...profileForm, job_title: e.target.value})}
                      placeholder="Votre poste"
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir des notifications par email
                      </p>
                    </div>
                    <Switch
                      checked={profileForm.notifications_enabled}
                      onCheckedChange={(checked) => setProfileForm({...profileForm, notifications_enabled: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Emails marketing</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir nos offres et actualités
                      </p>
                    </div>
                    <Switch
                      checked={profileForm.marketing_emails}
                      onCheckedChange={(checked) => setProfileForm({...profileForm, marketing_emails: checked})}
                    />
                  </div>
                </div>
                
                <Button onClick={saveProfile} className="w-full">
                  Sauvegarder le profil
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Créer un ticket de support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="subject">Sujet</Label>
                  <Input
                    id="subject"
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                    placeholder="Objet de votre demande"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Catégorie</Label>
                    <Select value={ticketForm.category} onValueChange={(value) => setTicketForm({...ticketForm, category: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Général</SelectItem>
                        <SelectItem value="technical">Technique</SelectItem>
                        <SelectItem value="billing">Facturation</SelectItem>
                        <SelectItem value="legal">Juridique</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="priority">Priorité</Label>
                    <Select value={ticketForm.priority} onValueChange={(value) => setTicketForm({...ticketForm, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Faible</SelectItem>
                        <SelectItem value="medium">Moyenne</SelectItem>
                        <SelectItem value="high">Élevée</SelectItem>
                        <SelectItem value="urgent">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                    placeholder="Décrivez votre problème en détail"
                    rows={4}
                  />
                </div>
                
                <Button 
                  onClick={createSupportTicket}
                  disabled={!ticketForm.subject || !ticketForm.description}
                  className="w-full"
                >
                  Créer le ticket
                </Button>
              </CardContent>
            </Card>

            {/* Existing Tickets */}
            {supportTickets.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Mes tickets de support</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {supportTickets.map((ticket) => (
                      <div key={ticket.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{ticket.subject}</h4>
                          <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {ticket.description}
                        </p>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Catégorie: {ticket.category}</span>
                          <span>Créé: {new Date(ticket.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mes commandes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{order.order_number}</h4>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Service:</span>
                          <span className="ml-2">{order.service_type}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Montant:</span>
                          <span className="ml-2">{order.amount}€</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tabs would follow similar pattern */}
          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Suivi des demandes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Suivi des demandes disponible en mode connecté.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Mes documents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Documents disponibles en mode connecté.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Informations de facturation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Facturation disponible en mode connecté.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
