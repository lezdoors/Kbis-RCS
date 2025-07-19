import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface RcsFormData {
  id?: string;
  type_entreprise: string;
  activite: string;
  ville: string;
  nom_entreprise: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  nationalite: string;
  capital_total: number;
  apport_nature: boolean;
  current_step: number;
}

export interface Associe {
  id?: string;
  nom: string;
  prenom: string;
  adresse: string;
  pourcentage: number;
}

export interface DocumentType {
  id?: string;
  type: string;
  status?: string;
  url?: string;
}

export const useRcsForm = () => {
  const [formData, setFormData] = useState<RcsFormData>({
    type_entreprise: '',
    activite: '',
    ville: '',
    nom_entreprise: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    nationalite: 'Française',
    capital_total: 0,
    apport_nature: false,
    current_step: 1,
  });

  const [associes, setAssocies] = useState<Associe[]>([]);
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Load existing form data from localStorage
  useEffect(() => {
    loadFormData();
  }, []);

  const loadFormData = async () => {
    try {
      // Load from localStorage for offline development
      const savedFormData = localStorage.getItem('rcs_form_data');
      const savedAssocies = localStorage.getItem('rcs_associes');
      const savedDocuments = localStorage.getItem('rcs_documents');

      if (savedFormData) {
        setFormData(JSON.parse(savedFormData));
      }
      if (savedAssocies) {
        setAssocies(JSON.parse(savedAssocies));
      }
      if (savedDocuments) {
        setDocuments(JSON.parse(savedDocuments));
      }
    } catch (error) {
      console.error('Error loading form data:', error);
    }
  };

  const saveFormData = async (stepData: Partial<RcsFormData>) => {
    try {
      setLoading(true);
      
      const updatedFormData = { ...formData, ...stepData };
      
      // Save to localStorage for offline development
      localStorage.setItem('rcs_form_data', JSON.stringify(updatedFormData));
      setFormData(updatedFormData);
      
      toast({
        title: "Sauvegardé",
        description: "Vos données ont été sauvegardées localement",
      });
    } catch (error: any) {
      console.error('Error saving form data:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder vos données",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const saveAssocies = async (newAssocies: Associe[]) => {
    try {
      // Save to localStorage for offline development
      localStorage.setItem('rcs_associes', JSON.stringify(newAssocies));
      setAssocies(newAssocies);
      
      toast({
        title: "Sauvegardé",
        description: "Les informations des associés ont été sauvegardées localement",
      });
    } catch (error: any) {
      console.error('Error saving associes:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les associés",
        variant: "destructive"
      });
    }
  };

  const updateStep = async (step: number) => {
    await saveFormData({ current_step: step });
  };

  const resetForm = () => {
    setFormData({
      type_entreprise: '',
      activite: '',
      ville: '',
      nom_entreprise: '',
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      adresse: '',
      nationalite: 'Française',
      capital_total: 0,
      apport_nature: false,
      current_step: 1,
    });
    setAssocies([]);
    setDocuments([]);
    
    // Clear localStorage
    localStorage.removeItem('rcs_form_data');
    localStorage.removeItem('rcs_associes');
    localStorage.removeItem('rcs_documents');
  };

  return {
    formData,
    associes,
    documents,
    loading,
    saveFormData,
    saveAssocies,
    updateStep,
    resetForm,
    loadFormData,
  };
};