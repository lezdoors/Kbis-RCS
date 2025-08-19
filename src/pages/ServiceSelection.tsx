import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Check, ArrowLeft, Phone, Mail, MapPin, Clock, Star, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ModernHeader } from '@/components/modern/ModernHeader';
import { ModernFooter } from '@/components/modern/ModernFooter';

interface ServiceOption {
  id: 'standard' | 'express' | 'postal';
  name: string;
  price: number;
  popular?: boolean;
  features: string[];
  deliveryTime: string;
  icon: React.ReactNode;
}

export const ServiceSelection = () => {
  const { siren } = useParams();
  const navigate = useNavigate();
  
  // Mock company data - in real app this would come from search results
  const company = {
    company_name: "EXEMPLE ENTREPRISE SAS",
    siren: siren || "123456789",
    address: "123 RUE DE LA PAIX",
    postal_code: "75001",
    city: "PARIS",
    legal_form: "SAS"
  };

  const [selectedService, setSelectedService] = useState<'standard' | 'express' | 'postal'>('express');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    fullName: '',
    deliveryAddress: '',
    deliveryPostalCode: '',
    deliveryCity: '',
    deliveryCompany: '',
    usagePurpose: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const services: ServiceOption[] = [
    {
      id: 'standard',
      name: 'Service Standard',
      price: 39,
      deliveryTime: 'Livraison en 4h maximum',
      icon: <Mail className="h-6 w-6" />,
      features: [
        'Document PDF par email',
        'Support par email',
        'Parfait pour la plupart des besoins'
      ]
    },
    {
      id: 'express',
      name: 'Service Express',
      price: 59,
      popular: true,
      deliveryTime: 'Livraison en 2h maximum',
      icon: <Clock className="h-6 w-6" />,
      features: [
        'Document PDF par email + SMS notification',
        'Support prioritaire par téléphone',
        'Pour les demandes urgentes'
      ]
    },
    {
      id: 'postal',
      name: 'Service Postal',
      price: 44,
      deliveryTime: 'Livraison 48h par courrier recommandé',
      icon: <MapPin className="h-6 w-6" />,
      features: [
        'Document papier officiel + PDF email',
        'Suivi de livraison inclus',
        'Pour les administrations exigeant l\'original'
      ]
    }
  ];

  const usagePurposes = [
    'Ouverture de compte bancaire',
    'Signature de contrat commercial',
    'Appel d\'offres public',
    'Démarches administratives',
    'Vérification partenaire',
    'Autre'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'L\'adresse email est requise';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'adresse email n\'est pas valide';
    }

    if (selectedService === 'express' && !formData.phone) {
      newErrors.phone = 'Le téléphone est requis pour le service Express';
    }

    if (selectedService === 'postal') {
      if (!formData.fullName) newErrors.fullName = 'Le nom complet est requis';
      if (!formData.deliveryAddress) newErrors.deliveryAddress = 'L\'adresse de livraison est requise';
      if (!formData.deliveryPostalCode) newErrors.deliveryPostalCode = 'Le code postal est requis';
      if (!formData.deliveryCity) newErrors.deliveryCity = 'La ville est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Proceed to payment
      console.log('Form valid, proceeding to payment...', { selectedService, formData });
    }
  };

  const selectedServiceData = services.find(s => s.id === selectedService)!;

  return (
    <div className="min-h-screen bg-gray-50">
      <ModernHeader />
      
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-8 p-0 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux résultats
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Company Confirmation */}
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Entreprise sélectionnée
                      </h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p className="font-medium text-gray-900">{company.company_name}</p>
                        <p>SIREN: {company.siren}</p>
                        <p>{company.address}, {company.postal_code} {company.city}</p>
                        <p>Forme juridique: {company.legal_form}</p>
                      </div>
                      <Link 
                        to={`/search?q=${company.siren}`}
                        className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                      >
                        Modifier la sélection
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Service Selection */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Choisissez votre service
                  </h3>
                  
                  <div className="space-y-4">
                    {services.map((service) => (
                      <div key={service.id} className="relative">
                        <input
                          type="radio"
                          id={service.id}
                          name="service"
                          value={service.id}
                          checked={selectedService === service.id}
                          onChange={(e) => setSelectedService(e.target.value as any)}
                          className="sr-only"
                        />
                        <label
                          htmlFor={service.id}
                          className={`block cursor-pointer rounded-xl border-2 p-6 transition-all hover:border-blue-300 ${
                            selectedService === service.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 bg-white'
                          } ${service.popular ? 'ring-2 ring-blue-500 ring-opacity-20' : ''}`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                              selectedService === service.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                            }`}>
                              {service.icon}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-lg font-semibold text-gray-900">
                                  {service.name}
                                </h4>
                                <span className="text-2xl font-bold text-gray-900">
                                  {service.price}€
                                </span>
                                {service.popular && (
                                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                                    <Star className="h-3 w-3 mr-1" />
                                    Populaire
                                  </Badge>
                                )}
                              </div>
                              
                              <p className="text-blue-600 font-medium mb-3">
                                {service.deliveryTime}
                              </p>
                              
                              <ul className="space-y-1">
                                {service.features.map((feature, index) => (
                                  <li key={index} className="text-gray-600 text-sm flex items-center gap-2">
                                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Informations de livraison
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                        Adresse email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="votre@email.com"
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Nous vous enverrons le KBIS à cette adresse
                      </p>
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone for Express service */}
                    {selectedService === 'express' && (
                      <div>
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">
                          Numéro de téléphone *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="06 12 34 56 78"
                          className={errors.phone ? 'border-red-500' : ''}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Pour vous notifier par SMS de la livraison
                        </p>
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                        )}
                      </div>
                    )}

                    {/* Additional fields for Postal service */}
                    {selectedService === 'postal' && (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900">Adresse de livraison postale</h4>
                        
                        <div>
                          <Label htmlFor="fullName">Nom complet *</Label>
                          <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                            placeholder="Prénom Nom"
                            className={errors.fullName ? 'border-red-500' : ''}
                          />
                          {errors.fullName && (
                            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="deliveryCompany">Nom de l'entreprise (optionnel)</Label>
                          <Input
                            id="deliveryCompany"
                            value={formData.deliveryCompany}
                            onChange={(e) => setFormData({...formData, deliveryCompany: e.target.value})}
                            placeholder="Nom de votre entreprise"
                          />
                        </div>

                        <div>
                          <Label htmlFor="deliveryAddress">Adresse *</Label>
                          <Input
                            id="deliveryAddress"
                            value={formData.deliveryAddress}
                            onChange={(e) => setFormData({...formData, deliveryAddress: e.target.value})}
                            placeholder="123 rue de la Paix"
                            className={errors.deliveryAddress ? 'border-red-500' : ''}
                          />
                          {errors.deliveryAddress && (
                            <p className="text-red-500 text-xs mt-1">{errors.deliveryAddress}</p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="deliveryPostalCode">Code postal *</Label>
                            <Input
                              id="deliveryPostalCode"
                              value={formData.deliveryPostalCode}
                              onChange={(e) => setFormData({...formData, deliveryPostalCode: e.target.value})}
                              placeholder="75001"
                              className={errors.deliveryPostalCode ? 'border-red-500' : ''}
                            />
                            {errors.deliveryPostalCode && (
                              <p className="text-red-500 text-xs mt-1">{errors.deliveryPostalCode}</p>
                            )}
                          </div>
                          
                          <div>
                            <Label htmlFor="deliveryCity">Ville *</Label>
                            <Input
                              id="deliveryCity"
                              value={formData.deliveryCity}
                              onChange={(e) => setFormData({...formData, deliveryCity: e.target.value})}
                              placeholder="Paris"
                              className={errors.deliveryCity ? 'border-red-500' : ''}
                            />
                            {errors.deliveryCity && (
                              <p className="text-red-500 text-xs mt-1">{errors.deliveryCity}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Usage Purpose */}
                    <div>
                      <Label htmlFor="usagePurpose" className="text-sm font-medium text-gray-700 mb-2 block">
                        Motif de la demande (optionnel mais recommandé)
                      </Label>
                      <Select value={formData.usagePurpose} onValueChange={(value) => setFormData({...formData, usagePurpose: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez le motif de votre demande" />
                        </SelectTrigger>
                        <SelectContent>
                          {usagePurposes.map((purpose) => (
                            <SelectItem key={purpose} value={purpose}>
                              {purpose}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500 mt-1">
                        Nous aide à optimiser les délais de livraison
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Récapitulatif de commande
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{selectedServiceData.name}</p>
                        <p className="text-sm text-gray-600">{selectedServiceData.deliveryTime}</p>
                      </div>
                      <p className="font-bold text-lg">{selectedServiceData.price}€</p>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-bold text-gray-900">Total</p>
                        <p className="text-2xl font-bold text-gray-900">{selectedServiceData.price}€</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                      <Shield className="h-5 w-5" />
                      <p className="text-sm font-medium">Garantie de livraison ou remboursé</p>
                    </div>
                  </div>

                  <Button 
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-lg"
                    size="lg"
                  >
                    Payer et commander
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Paiement sécurisé par Stripe
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <ModernFooter />
    </div>
  );
};