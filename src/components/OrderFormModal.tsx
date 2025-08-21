import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, ChevronLeft, ChevronRight, Building2, Mail, Phone, User, CreditCard, CheckCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

interface OrderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: string;
  prefilledCompany?: any;
}

interface FormData {
  // Company info
  companyName: string;
  siren: string;
  siret: string;
  
  // Customer details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Service
  serviceType: string;
}

export const OrderFormModal = ({ isOpen, onClose, selectedService, prefilledCompany }: OrderFormModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<any>(prefilledCompany || null);
  const [isSearching, setIsSearching] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>();

  const services = [
    { 
      id: 'standard', 
      name: 'Standard', 
      price: '39€', 
      delivery: 'Livraison en 4h maximum par email',
      features: ['Document PDF officiel', 'Support par email']
    },
    { 
      id: 'express', 
      name: 'Express', 
      price: '59€', 
      delivery: 'Livraison en 2h maximum par email + SMS',
      features: ['Document PDF officiel', 'SMS notification', 'Support téléphone prioritaire'],
      popular: true
    },
    { 
      id: 'postal', 
      name: 'Postal', 
      price: '44€', 
      delivery: 'Livraison 48h par courrier recommandé',
      features: ['Document papier + PDF', 'Suivi de livraison inclus']
    }
  ];

  const selectedServiceData = selectedService 
    ? services.find(s => s.id === selectedService.toLowerCase()) || services[0]
    : services[0];

  const handleCompanySearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResults = [
        {
          name: "APPLE FRANCE",
          siren: "542105118",
          siret: "54210511800012",
          address: "114 AVENUE CHARLES DE GAULLE, 92200 NEUILLY-SUR-SEINE",
          status: "Active"
        },
        {
          name: "TECH INNOVATION SAS",
          siren: "123456789",
          siret: "12345678900015",
          address: "15 RUE DE LA PAIX, 75001 PARIS",
          status: "Active"
        }
      ].filter(company => 
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.siren.includes(searchQuery) ||
        company.siret.includes(searchQuery)
      );
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 800);
  };

  const handleCompanySelect = (company: any) => {
    setSelectedCompany(company);
    setValue('companyName', company.name);
    setValue('siren', company.siren);
    setValue('siret', company.siret);
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePayment = async (data: FormData) => {
    setIsProcessing(true);
    
    // Here you would integrate with Stripe
    // For now, simulate processing
    setTimeout(() => {
      console.log('Order data:', { ...data, service: selectedServiceData });
      setIsProcessing(false);
      onClose();
      // Redirect to payment or success page
    }, 2000);
  };

  const resetModal = () => {
    setCurrentStep(1);
    setSearchQuery("");
    setSearchResults([]);
    setSelectedCompany(prefilledCompany || null);
    setIsSearching(false);
    setIsProcessing(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-brand-blue flex items-center gap-2">
            <Building2 className="w-6 h-6" />
            Commande d'extrait KBIS
          </DialogTitle>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step <= currentStep 
                  ? 'bg-brand-blue text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
              </div>
              {step < 3 && (
                <div className={`flex-1 h-1 mx-4 ${
                  step < currentStep ? 'bg-brand-blue' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {/* Step 1: Company Search */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">1. Recherche d'entreprise</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Input
                      placeholder="Nom d'entreprise, SIREN ou SIRET..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleCompanySearch()}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleCompanySearch}
                      disabled={!searchQuery.trim() || isSearching}
                      className="bg-brand-blue hover:bg-brand-blue/90"
                    >
                      {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                      Rechercher
                    </Button>
                  </div>

                  {/* Search Results */}
                  {searchResults.length > 0 && (
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {searchResults.map((company, index) => (
                        <div 
                          key={index}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            selectedCompany?.siren === company.siren
                              ? 'border-brand-blue bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleCompanySelect(company)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900">{company.name}</h4>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {company.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>SIREN: {company.siren} • SIRET: {company.siret}</p>
                            <p>{company.address}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Selected Company */}
                  {selectedCompany && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">✓ Entreprise sélectionnée</h4>
                      <p className="font-medium">{selectedCompany.name}</p>
                      <p className="text-sm text-green-700">
                        SIREN: {selectedCompany.siren} • SIRET: {selectedCompany.siret}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={handleNextStep}
                  disabled={!selectedCompany}
                  className="bg-brand-blue hover:bg-brand-blue/90"
                >
                  Continuer
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Service & Customer Details */}
          {currentStep === 2 && (
            <form className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">2. Confirmation du service et informations client</h3>
                
                {/* Service Selection */}
                <div className="mb-6">
                  <Label className="text-base font-medium mb-3 block">Service sélectionné</Label>
                  <div className="p-4 border-2 border-brand-blue bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-brand-blue flex items-center gap-2">
                          {selectedServiceData.name}
                          {selectedServiceData.popular && (
                            <Badge className="bg-red-500 text-white">POPULAIRE</Badge>
                          )}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">{selectedServiceData.delivery}</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {selectedServiceData.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-600" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-2xl font-bold text-brand-blue">
                        {selectedServiceData.price}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Customer Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      {...register("firstName", { required: "Le prénom est requis" })}
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      {...register("lastName", { required: "Le nom est requis" })}
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email", { 
                        required: "L'email est requis",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email invalide"
                        }
                      })}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      {...register("phone", { required: "Le téléphone est requis" })}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={handlePreviousStep}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Retour
                </Button>
                <Button 
                  type="button"
                  onClick={handleSubmit(handleNextStep)}
                  className="bg-brand-blue hover:bg-brand-blue/90"
                >
                  Continuer vers le paiement
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">3. Paiement sécurisé</h3>
              
              {/* Order Summary */}
              <div className="p-6 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-4">Récapitulatif de commande</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Entreprise:</span>
                    <span className="font-medium">{selectedCompany?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span className="font-medium">{selectedServiceData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Livraison:</span>
                    <span className="text-sm text-gray-600">{selectedServiceData.delivery}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-brand-blue">{selectedServiceData.price}</span>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <div className="text-center space-y-4">
                <p className="text-sm text-gray-600">
                  Vous allez être redirigé vers notre plateforme de paiement sécurisée Stripe
                </p>
                
                <Button 
                  onClick={handleSubmit(handlePayment)}
                  disabled={isProcessing}
                  className="w-full bg-brand-blue hover:bg-brand-blue/90 h-12 text-lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Traitement en cours...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payer {selectedServiceData.price}
                    </>
                  )}
                </Button>

                <div className="flex justify-between">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={handlePreviousStep}
                    disabled={isProcessing}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Retour
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};