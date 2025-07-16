import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HeroSection } from '@/components/HeroSection';
import { Footer } from '@/components/Footer';
import { useRcsForm } from '@/hooks/useRcsForm';
import { ArrowRight, Building2 } from 'lucide-react';

const Commencer = () => {
  const navigate = useNavigate();
  const { formData, saveFormData, updateStep, loading } = useRcsForm();
  const [localData, setLocalData] = useState({
    type_entreprise: formData.type_entreprise,
    activite: formData.activite,
    ville: formData.ville,
    nom_entreprise: formData.nom_entreprise,
  });

  useEffect(() => {
    setLocalData({
      type_entreprise: formData.type_entreprise,
      activite: formData.activite,
      ville: formData.ville,
      nom_entreprise: formData.nom_entreprise,
    });
  }, [formData]);

  const handleNext = async () => {
    if (!localData.type_entreprise || !localData.activite || !localData.ville) {
      return;
    }

    await saveFormData(localData);
    await updateStep(2);
    navigate('/coordonnees');
  };

  const entrepriseTypes = [
    { value: 'sas', label: 'SAS - Société par Actions Simplifiée' },
    { value: 'sasu', label: 'SASU - Société par Actions Simplifiée Unipersonnelle' },
    { value: 'sarl', label: 'SARL - Société à Responsabilité Limitée' },
    { value: 'eurl', label: 'EURL - Entreprise Unipersonnelle à Responsabilité Limitée' },
    { value: 'micro', label: 'Micro-entreprise' },
    { value: 'sci', label: 'SCI - Société Civile Immobilière' },
    { value: 'association', label: 'Association' },
  ];

  const isFormValid = localData.type_entreprise && localData.activite && localData.ville;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection 
        title="Inscription RCS - Étape 1 sur 6"
        subtitle="Commencez votre inscription au Registre du Commerce et des Sociétés"
        showActivityGrid={false}
        showTrustIndicators={false}
        primaryCTA={{
          text: "Retour au choix du statut",
          action: () => navigate('/choisir-statut')
        }}
        secondaryCTA={{
          text: "Aide & Support",
          action: () => {
            const supportSection = document.querySelector('#support');
            supportSection?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      <section className="section-administrative">
        <div className="max-w-2xl mx-auto px-4">

          <Card className="card-premium">
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
              <CardDescription>
                Renseignez les informations de base de votre entreprise
              </CardDescription>
            </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="type_entreprise">Type d'entreprise *</Label>
              <Select 
                value={localData.type_entreprise} 
                onValueChange={(value) => setLocalData({...localData, type_entreprise: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le type d'entreprise" />
                </SelectTrigger>
                <SelectContent>
                  {entrepriseTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="activite">Activité principale *</Label>
              <Input
                id="activite"
                placeholder="Ex: Conseil en marketing digital"
                value={localData.activite}
                onChange={(e) => setLocalData({...localData, activite: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ville">Ville ou Code postal *</Label>
              <Input
                id="ville"
                placeholder="Ex: Paris ou 75001"
                value={localData.ville}
                onChange={(e) => setLocalData({...localData, ville: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nom_entreprise">Nom de l'entreprise (optionnel)</Label>
              <Input
                id="nom_entreprise"
                placeholder="Nom de votre entreprise"
                value={localData.nom_entreprise}
                onChange={(e) => setLocalData({...localData, nom_entreprise: e.target.value})}
              />
            </div>

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={() => navigate('/choisir-statut')}
                className="btn-administrative-outline"
              >
                Retour
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isFormValid || loading}
                className="flex items-center gap-2 btn-administrative"
              >
                Suivant
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Commencer;