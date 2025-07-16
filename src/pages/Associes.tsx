import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Header } from '@/components/Header';
import { useRcsForm, Associe } from '@/hooks/useRcsForm';
import { ArrowLeft, ArrowRight, Plus, Trash2, Users } from 'lucide-react';

const Associes = () => {
  const navigate = useNavigate();
  const { associes, saveAssocies, updateStep, loading } = useRcsForm();
  const [localAssocies, setLocalAssocies] = useState<Associe[]>(associes.length > 0 ? associes : []);

  useEffect(() => {
    if (associes.length > 0) {
      setLocalAssocies(associes);
    }
  }, [associes]);

  const addAssocie = () => {
    setLocalAssocies([...localAssocies, { nom: '', prenom: '', adresse: '', pourcentage: 0 }]);
  };

  const removeAssocie = (index: number) => {
    setLocalAssocies(localAssocies.filter((_, i) => i !== index));
  };

  const updateAssocie = (index: number, field: keyof Associe, value: string | number) => {
    const updated = [...localAssocies];
    updated[index] = { ...updated[index], [field]: value };
    setLocalAssocies(updated);
  };

  const handleNext = async () => {
    if (localAssocies.length > 0) {
      const totalPourcentage = localAssocies.reduce((sum, associe) => sum + associe.pourcentage, 0);
      if (totalPourcentage !== 100) {
        alert('Le total des pourcentages doit être égal à 100%');
        return;
      }
    }

    await saveAssocies(localAssocies);
    await updateStep(4);
    navigate('/capital');
  };

  const handleBack = () => {
    navigate('/coordonnees');
  };

  const isFormValid = localAssocies.length === 0 || localAssocies.every(associe => 
    associe.nom && associe.prenom && associe.adresse && associe.pourcentage > 0
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-2xl mx-auto p-4">
        <div className="text-center mb-8">
          <Users className="mx-auto h-12 w-12 text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Associés
          </h1>
          <p className="text-gray-600">
            Étape 3 sur 6 - Informations des associés
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Associés de l'entreprise</CardTitle>
            <CardDescription>
              Ajoutez les associés de votre entreprise (optionnel)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {localAssocies.map((associe, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Associé {index + 1}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAssocie(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nom *</Label>
                    <Input
                      placeholder="Nom"
                      value={associe.nom}
                      onChange={(e) => updateAssocie(index, 'nom', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Prénom *</Label>
                    <Input
                      placeholder="Prénom"
                      value={associe.prenom}
                      onChange={(e) => updateAssocie(index, 'prenom', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Adresse *</Label>
                  <Input
                    placeholder="Adresse complète"
                    value={associe.adresse}
                    onChange={(e) => updateAssocie(index, 'adresse', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Pourcentage de parts *</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0"
                    value={associe.pourcentage}
                    onChange={(e) => updateAssocie(index, 'pourcentage', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={addAssocie}
              className="w-full flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Ajouter un associé
            </Button>

            {localAssocies.length > 0 && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">
                  Total des pourcentages: {localAssocies.reduce((sum, associe) => sum + associe.pourcentage, 0)}%
                  {localAssocies.reduce((sum, associe) => sum + associe.pourcentage, 0) !== 100 && (
                    <span className="text-red-600 ml-2">
                      (Doit être égal à 100%)
                    </span>
                  )}
                </p>
              </div>
            )}

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

export default Associes;