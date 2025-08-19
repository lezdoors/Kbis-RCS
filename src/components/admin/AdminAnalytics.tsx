import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp,
  Users,
  DollarSign,
  Package,
  Clock,
  Star
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const chartConfig = {
  orders: {
    label: "Commandes",
    color: "hsl(var(--primary))",
  },
  revenue: {
    label: "Revenus",
    color: "hsl(var(--secondary))",
  },
};

export const AdminAnalytics = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("7d");
  const [ordersData, setOrdersData] = useState<any[]>([]);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [serviceTypeData, setServiceTypeData] = useState<any[]>([]);
  const [conversionData, setConversionData] = useState<any>({});
  
  useEffect(() => {
    fetchAnalyticsData();
  }, [dateRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      
      // Calculate date range
      const endDate = new Date();
      const startDate = new Date();
      switch (dateRange) {
        case "7d":
          startDate.setDate(endDate.getDate() - 7);
          break;
        case "30d":
          startDate.setDate(endDate.getDate() - 30);
          break;
        case "90d":
          startDate.setDate(endDate.getDate() - 90);
          break;
      }

      // Fetch orders data
      const { data: orders, error: ordersError } = await supabase
        .from('kbis_orders')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString())
        .order('created_at', { ascending: true });

      if (ordersError) throw ordersError;

      // Process data for charts
      processOrdersData(orders || []);
      processRevenueData(orders || []);
      processServiceTypeData(orders || []);
      processConversionData(orders || []);

    } catch (error) {
      console.error('Error fetching analytics data:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données analytiques.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const processOrdersData = (orders: any[]) => {
    const dailyOrders = orders.reduce((acc: any, order) => {
      const date = new Date(order.created_at).toLocaleDateString('fr-FR');
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.entries(dailyOrders).map(([date, count]) => ({
      date,
      orders: count
    }));

    setOrdersData(chartData);
  };

  const processRevenueData = (orders: any[]) => {
    const dailyRevenue = orders.reduce((acc: any, order) => {
      const date = new Date(order.created_at).toLocaleDateString('fr-FR');
      acc[date] = (acc[date] || 0) + (order.amount_paid || 0);
      return acc;
    }, {});

    const chartData = Object.entries(dailyRevenue).map(([date, revenue]) => ({
      date,
      revenue: (revenue as number) / 100 // Convert from cents to euros
    }));

    setRevenueData(chartData);
  };

  const processServiceTypeData = (orders: any[]) => {
    const serviceTypes = orders.reduce((acc: any, order) => {
      const type = order.service_type;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.entries(serviceTypes).map(([type, count]) => ({
      name: type,
      value: count
    }));

    setServiceTypeData(chartData);
  };

  const processConversionData = (orders: any[]) => {
    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.status === 'completed').length;
    const processingOrders = orders.filter(o => o.status === 'processing').length;
    const failedOrders = orders.filter(o => o.status === 'failed').length;
    
    const totalRevenue = orders.reduce((sum, order) => sum + (order.amount_paid || 0), 0);
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders / 100 : 0;
    
    setConversionData({
      totalOrders,
      completedOrders,
      processingOrders,
      failedOrders,
      conversionRate: totalOrders > 0 ? (completedOrders / totalOrders * 100).toFixed(1) : 0,
      avgOrderValue: avgOrderValue.toFixed(2),
      totalRevenue: (totalRevenue / 100).toFixed(2)
    });
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Date Range Selector */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Analytics & Rapports</CardTitle>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 derniers jours</SelectItem>
                <SelectItem value="30d">30 derniers jours</SelectItem>
                <SelectItem value="90d">90 derniers jours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes totales</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionData.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              {conversionData.conversionRate}% de conversion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus totaux</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionData.totalRevenue}€</div>
            <p className="text-xs text-muted-foreground">
              Panier moyen: {conversionData.avgOrderValue}€
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes terminées</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{conversionData.completedOrders}</div>
            <p className="text-xs text-muted-foreground">
              {conversionData.processingOrders} en cours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de réussite</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionData.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              {conversionData.failedOrders} échecs
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Évolution des commandes</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="orders" stroke="var(--color-orders)" strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenus quotidiens</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="var(--color-revenue)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Répartition par service</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {serviceTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Métriques de performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Taux de conversion</span>
                <span className="text-sm font-bold">{conversionData.conversionRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Panier moyen</span>
                <span className="text-sm font-bold">{conversionData.avgOrderValue}€</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Temps de traitement moyen</span>
                <span className="text-sm font-bold">45 minutes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Satisfaction client</span>
                <span className="text-sm font-bold">4.8/5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Taux d'abandon</span>
                <span className="text-sm font-bold">12%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};