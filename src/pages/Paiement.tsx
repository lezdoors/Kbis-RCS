import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { useRcsForm } from '@/hooks/useRcsForm';
import { ArrowLeft, CreditCard, CheckCircle2, Building2, User, Users, DollarSign } from 'lucide-react';

const Paiement = () => {
  const navigate = useNavigate();
  const { formData, associes, loading } = useRcsForm();
  const [paymentLoading, setPaymentLoading] = useState(false);

  const handleBack = () => {
    navigate('/documents');
  };

  const handlePayment = async () => {
    setPaymentLoading(true);
    
    // Simulate payment processing
    // In real implementation, this would integrate with Stripe
    setTimeout(() => {
      setPaymentLoading(false);
      // Navigate to success page or dashboard
      navigate('/dashboard');
    }, 2000);
  };

  const servicePrice = 299; // Prix du service en euros
  const tvaRate = 0.20;
  const tvAmount = servicePrice * tvaRate;
  const totalPrice = servicePrice + tvAmount;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center mb-8">
          <CreditCard className="mx-auto h-12 w-12 text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Récapitulatif et paiement
          </h1>
          <p className="text-gray-600">
            Étape 6 sur 6 - Validation de votre demande
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Récapitulatif des informations */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Informations entreprise
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type d'entreprise:</span>
                  <Badge variant="outline">{formData.type_entreprise?.toUpperCase()}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Activité:</span>
                  <span className="font-medium">{formData.activite}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ville:</span>
                  <span className="font-medium">{formData.ville}</span>
                </div>
                {formData.nom_entreprise && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nom:</span>
                    <span className="font-medium">{formData.nom_entreprise}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Dirigeant
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nom complet:</span>
                  <span className="font-medium">{formData.prenom} {formData.nom}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Téléphone:</span>
                  <span className="font-medium">{formData.telephone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nationalité:</span>
                  <span className="font-medium">{formData.nationalite}</span>
                </div>
              </CardContent>
            </Card>

            {associes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Associés ({associes.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {associes.map((associe, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{associe.prenom} {associe.nom}</span>
                      <Badge variant="secondary">{associe.pourcentage}%</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Capital social
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Capital total:</span>
                  <span className="font-medium">{formData.capital_total} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Apports en nature:</span>
                  <Badge variant={formData.apport_nature ? "default" : "secondary"}>
                    {formData.apport_nature ? "Oui" : "Non"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Paiement */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Votre commande</CardTitle>
                <CardDescription>
                  Service d'accompagnement pour votre inscription RCS
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Service d'inscription RCS</span>
                    <span>{servicePrice} €</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>TVA (20%)</span>
                    <span>{tvAmount.toFixed(2)} €</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{totalPrice.toFixed(2)} €</span>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">✅ Inclus dans votre commande:</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Préparation de votre dossier RCS</li>
                    <li>• Vérification des documents</li>
                    <li>• Dépôt au greffe du tribunal</li>
                    <li>• Suivi de votre demande</li>
                    <li>• Support client dédié</li>
                  </ul>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={paymentLoading || loading}
                  className="w-full"
                  size="lg"
                >
                  {paymentLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Traitement...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payer {totalPrice.toFixed(2)} €
                    </div>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Paiement sécurisé par Stripe
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prochaines étapes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-1 text-xs font-bold min-w-[24px] h-6 flex items-center justify-center">1</div>
                    <div>
                      <p className="font-medium">Paiement confirmé</p>
                      <p className="text-gray-600">Votre commande est validée</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-1 text-xs font-bold min-w-[24px] h-6 flex items-center justify-center">2</div>
                    <div>
                      <p className="font-medium">Préparation du dossier</p>
                      <p className="text-gray-600">Nous préparons votre dossier RCS</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-1 text-xs font-bold min-w-[24px] h-6 flex items-center justify-center">3</div>
                    <div>
                      <p className="font-medium">Dépôt au greffe</p>
                      <p className="text-gray-600">Dépôt officiel de votre demande</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-1 text-xs font-bold min-w-[24px] h-6 flex items-center justify-center">4</div>
                    <div>
                      <p className="font-medium">Réception du Kbis</p>
                      <p className="text-gray-600">Vous recevrez votre extrait Kbis</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Paiement;