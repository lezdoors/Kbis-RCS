import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Header } from '@/components/Header';
import { useRcsForm } from '@/hooks/useRcsForm';
import { ArrowLeft, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';

const Documents = () => {
  const navigate = useNavigate();
  const { formData, updateStep, loading } = useRcsForm();
  const [checkedDocuments, setCheckedDocuments] = useState<string[]>([]);

  const requiredDocuments = [
    {
      id: 'piece_identite',
      label: 'Pièce d\'identité du dirigeant',
      description: 'Carte d\'identité ou passeport en cours de validité'
    },
    {
      id: 'justificatif_domicile',
      label: 'Justificatif de domicile',
      description: 'Facture d\'électricité, gaz, eau ou téléphone de moins de 3 mois'
    },
    {
      id: 'declaration_non_condamnation',
      label: 'Déclaration de non-condamnation',
      description: 'Attestation sur l\'honneur de non-condamnation'
    },
    {
      id: 'statuts_signes',
      label: 'Statuts signés',
      description: 'Statuts de la société signés par tous les associés'
    },
    {
      id: 'attestation_depot_capital',
      label: 'Attestation de dépôt de capital',
      description: 'Certificat de dépôt de capital social délivré par la banque'
    },
    {
      id: 'formulaire_m0',
      label: 'Formulaire M0',
      description: 'Formulaire de déclaration de création d\'entreprise'
    }
  ];

  const handleDocumentChange = (documentId: string, checked: boolean) => {
    if (checked) {
      setCheckedDocuments([...checkedDocuments, documentId]);
    } else {
      setCheckedDocuments(checkedDocuments.filter(id => id !== documentId));
    }
  };

  const handleNext = async () => {
    await updateStep(6);
    navigate('/paiement');
  };

  const handleBack = () => {
    navigate('/capital');
  };

  const allDocumentsChecked = checkedDocuments.length === requiredDocuments.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-2xl mx-auto p-4">
        <div className="text-center mb-8">
          <FileText className="mx-auto h-12 w-12 text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Documents requis
          </h1>
          <p className="text-gray-600">
            Étape 5 sur 6 - Vérification des documents
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Documents nécessaires</CardTitle>
            <CardDescription>
              Assurez-vous d'avoir tous les documents requis pour votre inscription RCS
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {requiredDocuments.map((doc) => (
                <div key={doc.id} className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Checkbox
                    id={doc.id}
                    checked={checkedDocuments.includes(doc.id)}
                    onCheckedChange={(checked) => handleDocumentChange(doc.id, checked as boolean)}
                  />
                  <div className="flex-1">
                    <label htmlFor={doc.id} className="font-medium cursor-pointer">
                      {doc.label}
                    </label>
                    <p className="text-sm text-gray-600 mt-1">
                      {doc.description}
                    </p>
                  </div>
                  {checkedDocuments.includes(doc.id) && (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  )}
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">📋 Important</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Tous les documents doivent être en cours de validité</li>
                <li>• Les copies doivent être lisibles et complètes</li>
                <li>• Certains documents peuvent nécessiter une certification</li>
                <li>• Vous pourrez télécharger vos documents après le paiement</li>
              </ul>
            </div>

            {allDocumentsChecked && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 text-green-800">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-medium">Tous les documents sont prêts !</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Vous pouvez maintenant procéder au paiement.
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
                disabled={!allDocumentsChecked || loading}
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

export default Documents;