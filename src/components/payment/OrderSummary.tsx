import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Mail, MapPin, Phone } from "lucide-react";
import { PaymentData } from "@/lib/stripe";

interface OrderSummaryProps {
  orderData: PaymentData;
}

export const OrderSummary = ({ orderData }: OrderSummaryProps) => {
  const getServiceDetails = (serviceType: string) => {
    switch (serviceType) {
      case 'standard':
        return {
          name: 'Standard',
          features: ['Livraison en 4h maximum', 'Document PDF par email', 'Support par email'],
          price: 39
        };
      case 'express':
        return {
          name: 'Express',
          features: ['Livraison en 2h maximum', 'PDF + SMS notification', 'Support prioritaire'],
          price: 59
        };
      case 'postal':
        return {
          name: 'Postal',
          features: ['Livraison 48h courrier', 'Document papier + PDF', 'Suivi inclus'],
          price: 44
        };
      default:
        return { name: 'Standard', features: [], price: 39 };
    }
  };

  const service = getServiceDetails(orderData.serviceType);

  return (
    <div className="space-y-6">
      <Card className="p-6 border-border bg-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Récapitulatif de la commande</h3>
        
        {/* Company Information */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="font-medium text-foreground">{orderData.companyName}</p>
              <p className="text-sm text-muted-foreground">SIREN: {orderData.siren}</p>
            </div>
          </div>
        </div>

        {/* Service Information */}
        <div className="border-t border-border pt-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-foreground">Service {service.name}</h4>
            {orderData.serviceType === 'express' && (
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                Populaire
              </Badge>
            )}
          </div>
          <ul className="space-y-1">
            {service.features.map((feature, index) => (
              <li key={index} className="text-sm text-muted-foreground">• {feature}</li>
            ))}
          </ul>
        </div>

        {/* Delivery Information */}
        <div className="border-t border-border pt-4 mb-6">
          <h4 className="font-medium text-foreground mb-3">Informations de livraison</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{orderData.customerEmail}</span>
            </div>
            {orderData.customerPhone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{orderData.customerPhone}</span>
              </div>
            )}
            {orderData.deliveryAddress && (
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p>{orderData.deliveryAddress.name}</p>
                  {orderData.deliveryAddress.company && (
                    <p>{orderData.deliveryAddress.company}</p>
                  )}
                  <p>{orderData.deliveryAddress.street}</p>
                  <p>{orderData.deliveryAddress.postalCode} {orderData.deliveryAddress.city}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="border-t border-border pt-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Service KBIS</span>
              <span className="text-foreground">{service.price}€</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">TVA (20%)</span>
              <span className="text-foreground">{(service.price * 0.2).toFixed(2)}€</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2 border-t border-border">
              <span className="text-foreground">Total</span>
              <span className="text-foreground">{(service.price * 1.2).toFixed(2)}€</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Guarantee Badge */}
      <div className="text-center">
        <Badge variant="outline" className="bg-success/10 text-success border-success/20 px-4 py-2">
          Garantie de livraison ou remboursé
        </Badge>
      </div>
    </div>
  );
};