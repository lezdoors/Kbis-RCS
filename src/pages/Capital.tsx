import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Header } from '@/components/Header';
import { useRcsForm } from '@/hooks/useRcsForm';
import { ArrowLeft, ArrowRight, DollarSign } from 'lucide-react';

const Capital = () => {
  const navigate = useNavigate();
  const { formData, associes, saveFormData, updateStep, loading } = useRcsForm();
  const [localData, setLocalData] = useState({
    capital_total: formData.capital_total,
    apport_nature: formData.apport_nature,
  });

  useEffect(() => {
    setLocalData({
      capital_total: formData.capital_total,
      apport_nature: formData.apport_nature,
    });
  }, [formData]);

  const handleNext = async () => {
    if (!localData.capital_total || localData.capital_total <= 0) {
      return;
    }

    await saveFormData(localData);
    await updateStep(5);
    navigate('/documents');
  };

  const handleBack = () => {
    navigate('/associes');
  };

  const isFormValid = localData.capital_total > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-2xl mx-auto p-4">
        <div className="text-center mb-8">
          <DollarSign className="mx-auto h-12 w-12 text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Capital social
          </h1>
          <p className="text-gray-600">
            Étape 4 sur 6 - Informations financières
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Capital et apports</CardTitle>
            <CardDescription>
              Définissez le capital social de votre entreprise
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="capital_total">Capital total (en €) *</Label>
              <Input
                id="capital_total"
                type="number"
                min="1"
                placeholder="1000"
                value={localData.capital_total}
                onChange={(e) => setLocalData({...localData, capital_total: parseFloat(e.target.value) || 0})}
              />
              <p className="text-sm text-gray-600">
                Capital minimum recommandé : 1€ pour une SARL/SAS
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="apport_nature"
                checked={localData.apport_nature}
                onCheckedChange={(checked) => setLocalData({...localData, apport_nature: checked as boolean})}
              />
              <Label htmlFor="apport_nature" className="text-sm">
                J'ai des apports en nature (biens, matériel, etc.)
              </Label>
            </div>

            {localData.apport_nature && (
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Les apports en nature nécessitent une évaluation par un commissaire aux apports 
                  si leur valeur dépasse 30 000€ ou si le total des apports en nature représente plus de la moitié du capital.
                </p>
              </div>
            )}

            {associes.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium">Répartition des parts</h3>
                <div className="space-y-2">
                  {associes.map((associe, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{associe.prenom} {associe.nom}</span>
                      <div className="text-right">
                        <div className="font-medium">{associe.pourcentage}%</div>
                        <div className="text-sm text-gray-600">
                          {((localData.capital_total * associe.pourcentage) / 100).toFixed(2)} €
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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

export default Capital;