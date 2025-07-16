import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Header } from "@/components/Header";
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
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Data states
  const [profile, setProfile] = useState<any>(null);
  const [demandes, setDemandes] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [supportTickets, setSupportTickets] = useState<any[]>([]);
  const [billingInfo, setBillingInfo] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  
  // Form states
  const [profileForm, setProfileForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    company_name: '',
    job_title: '',
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
    const initializeDashboard = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) {
          navigate('/login');
          return;
        }
        
        setUser(user);
        
        // Load all dashboard data
        await Promise.all([
          loadProfile(user.id),
          loadDemandes(user.id),
          loadOrders(user.id),
          loadSupportTickets(user.id),
          loadBillingInfo(user.id),
          loadDocuments(user.id)
        ]);
        
      } catch (error) {
        console.error('Error initializing dashboard:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données du tableau de bord",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    initializeDashboard();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          navigate('/login');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const loadProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (data) {
      setProfile(data);
      setProfileForm({
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        phone: data.phone || '',
        company_name: data.company_name || '',
        job_title: data.job_title || '',
        notifications_enabled: data.notifications_enabled,
        marketing_emails: data.marketing_emails
      });
    }
  };

  const loadDemandes = async (userId: string) => {
    const { data, error } = await supabase
      .from('demandes_rcs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (data) setDemandes(data);
  };

  const loadOrders = async (userId: string) => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (data) setOrders(data);
  };

  const loadSupportTickets = async (userId: string) => {
    const { data, error } = await supabase
      .from('support_tickets')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (data) setSupportTickets(data);
  };

  const loadBillingInfo = async (userId: string) => {
    const { data, error } = await supabase
      .from('billing_info')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (data) {
      setBillingInfo(data);
      setBillingForm({
        company_name: data.company_name || '',
        billing_address: data.billing_address || '',
        vat_number: data.vat_number || '',
        payment_method: data.payment_method || 'card',
        is_company: data.is_company || false
      });
    }
  };

  const loadDocuments = async (userId: string) => {
    const { data, error } = await supabase
      .from('documents')
      .select('*, demandes_rcs(nom_entreprise)')
      .eq('demandes_rcs.user_id', userId)
      .order('created_at', { ascending: false });
    
    if (data) setDocuments(data);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de se déconnecter. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const saveProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          ...profileForm
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été sauvegardées avec succès.",
      });
      
      await loadProfile(user.id);
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
      const { data, error } = await supabase
        .from('support_tickets')
        .insert([{
          user_id: user.id,
          ...ticketForm
        }]);

      if (error) throw error;

      toast({
        title: "Ticket créé",
        description: "Votre demande de support a été envoyée avec succès.",
      });
      
      setTicketForm({
        subject: '',
        description: '',
        category: 'general',
        priority: 'medium'
      });
      
      await loadSupportTickets(user.id);
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
      const { data, error } = await supabase
        .from('billing_info')
        .upsert({
          user_id: user.id,
          ...billingForm
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      toast({
        title: "Informations de facturation mises à jour",
        description: "Vos données de facturation ont été sauvegardées.",
      });
      
      await loadBillingInfo(user.id);
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
      case 'high': return 'bg-orange-100 text-orange-800';
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
                Bienvenue, {profile?.first_name || user?.email}
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
                    <Label htmlFor="company_name">Entreprise</Label>
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
                  <h3 className="text-lg font-semibold">Préférences</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir des notifications sur l'état de vos demandes
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
                        Recevoir des offres et actualités par email
                      </p>
                    </div>
                    <Switch
                      checked={profileForm.marketing_emails}
                      onCheckedChange={(checked) => setProfileForm({...profileForm, marketing_emails: checked})}
                    />
                  </div>
                </div>
                
                <Button onClick={saveProfile} className="w-full">
                  Sauvegarder les modifications
                </Button>
              </CardContent>
            </Card>
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
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Commande #{order.order_number}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.service_type} • {order.amount}€
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(order.payment_status)}>
                          {order.payment_status}
                        </Badge>
                        {order.invoice_url && (
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Facture
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  {orders.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      Aucune commande trouvée
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Suivi des démarches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {demandes.map((demande) => (
                    <div key={demande.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">{demande.nom_entreprise || 'Demande RCS'}</h3>
                          <p className="text-sm text-muted-foreground">
                            {demande.type_entreprise} • {demande.ville}
                          </p>
                        </div>
                        <Badge className={getStatusColor(demande.status)}>
                          {demande.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Progression</span>
                          <span className="text-sm font-medium">{demande.current_step}/6</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(demande.current_step / 6) * 100}%` }}
                          />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className={`text-center p-2 rounded ${demande.current_step >= 1 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                            Informations
                          </div>
                          <div className={`text-center p-2 rounded ${demande.current_step >= 3 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                            Associés
                          </div>
                          <div className={`text-center p-2 rounded ${demande.current_step >= 6 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                            Terminé
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {demandes.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      Aucune demande en cours
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mes documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{doc.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {doc.demandes_rcs?.nom_entreprise || 'Document'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(doc.created_at).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger
                      </Button>
                    </div>
                  ))}
                  {documents.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      Aucun document disponible
                    </div>
                  )}
                </div>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Catégorie</Label>
                    <Select value={ticketForm.category} onValueChange={(value) => setTicketForm({...ticketForm, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Général</SelectItem>
                        <SelectItem value="technical">Technique</SelectItem>
                        <SelectItem value="billing">Facturation</SelectItem>
                        <SelectItem value="legal">Juridique</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priorité</Label>
                    <Select value={ticketForm.priority} onValueChange={(value) => setTicketForm({...ticketForm, priority: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner la priorité" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Basse</SelectItem>
                        <SelectItem value="medium">Moyenne</SelectItem>
                        <SelectItem value="high">Élevée</SelectItem>
                        <SelectItem value="urgent">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">Sujet</Label>
                  <Input
                    id="subject"
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                    placeholder="Décrivez brièvement votre problème"
                  />
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
                <Button onClick={createSupportTicket} className="w-full">
                  Créer le ticket
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mes tickets de support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportTickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{ticket.subject}</h3>
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {ticket.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>#{ticket.id.substring(0, 8)}</span>
                        <span>{new Date(ticket.created_at).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  ))}
                  {supportTickets.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      Aucun ticket de support
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations de facturation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={billingForm.is_company}
                    onCheckedChange={(checked) => setBillingForm({...billingForm, is_company: checked})}
                  />
                  <Label>Facturation entreprise</Label>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="billing_company">Nom de l'entreprise</Label>
                    <Input
                      id="billing_company"
                      value={billingForm.company_name}
                      onChange={(e) => setBillingForm({...billingForm, company_name: e.target.value})}
                      placeholder="Nom de votre entreprise"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vat_number">Numéro de TVA</Label>
                    <Input
                      id="vat_number"
                      value={billingForm.vat_number}
                      onChange={(e) => setBillingForm({...billingForm, vat_number: e.target.value})}
                      placeholder="FR12345678901"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="billing_address">Adresse de facturation</Label>
                  <Textarea
                    id="billing_address"
                    value={billingForm.billing_address}
                    onChange={(e) => setBillingForm({...billingForm, billing_address: e.target.value})}
                    placeholder="Adresse complète de facturation"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="payment_method">Méthode de paiement préférée</Label>
                  <Select value={billingForm.payment_method} onValueChange={(value) => setBillingForm({...billingForm, payment_method: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une méthode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">Carte bancaire</SelectItem>
                      <SelectItem value="bank_transfer">Virement bancaire</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={saveBillingInfo} className="w-full">
                  Sauvegarder les informations
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;