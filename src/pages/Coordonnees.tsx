import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRcsForm } from '@/hooks/useRcsForm';
import { ArrowLeft, ArrowRight, User } from 'lucide-react';

const Coordonnees = () => {
  const navigate = useNavigate();
  const { formData, saveFormData, updateStep, loading } = useRcsForm();
  const [localData, setLocalData] = useState({
    nom: formData.nom,
    prenom: formData.prenom,
    email: formData.email,
    telephone: formData.telephone,
    adresse: formData.adresse,
    nationalite: formData.nationalite,
  });

  useEffect(() => {
    setLocalData({
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      telephone: formData.telephone,
      adresse: formData.adresse,
      nationalite: formData.nationalite,
    });
  }, [formData]);

  const handleNext = async () => {
    if (!localData.nom || !localData.prenom || !localData.email || !localData.telephone || !localData.adresse) {
      return;
    }

    await saveFormData(localData);
    await updateStep(3);
    navigate('/associes');
  };

  const handleBack = () => {
    navigate('/commencer');
  };

  const isFormValid = localData.nom && localData.prenom && localData.email && localData.telephone && localData.adresse;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <User className="mx-auto h-12 w-12 text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Vos coordonnées
          </h1>
          <p className="text-gray-600">
            Étape 2 sur 6 - Informations personnelles
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Coordonnées du dirigeant</CardTitle>
            <CardDescription>
              Renseignez vos informations personnelles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom *</Label>
                <Input
                  id="nom"
                  placeholder="Nom"
                  value={localData.nom}
                  onChange={(e) => setLocalData({...localData, nom: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom *</Label>
                <Input
                  id="prenom"
                  placeholder="Prénom"
                  value={localData.prenom}
                  onChange={(e) => setLocalData({...localData, prenom: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={localData.email}
                onChange={(e) => setLocalData({...localData, email: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telephone">Téléphone *</Label>
              <Input
                id="telephone"
                placeholder="06 XX XX XX XX"
                value={localData.telephone}
                onChange={(e) => setLocalData({...localData, telephone: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adresse">Adresse complète *</Label>
              <Input
                id="adresse"
                placeholder="123 rue de la Paix, 75001 Paris"
                value={localData.adresse}
                onChange={(e) => setLocalData({...localData, adresse: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationalite">Nationalité</Label>
              <Select 
                value={localData.nationalite} 
                onValueChange={(value) => setLocalData({...localData, nationalite: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre nationalité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Française">Française</SelectItem>
                  <SelectItem value="Allemande">Allemande</SelectItem>
                  <SelectItem value="Britannique">Britannique</SelectItem>
                  <SelectItem value="Espagnole">Espagnole</SelectItem>
                  <SelectItem value="Italienne">Italienne</SelectItem>
                  <SelectItem value="Autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isFormValid || loading}
                className="flex items-center gap-2"
              >
                Suivant
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Coordonnees;