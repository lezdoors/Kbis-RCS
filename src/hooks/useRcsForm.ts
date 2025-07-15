import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
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

  // Load existing form data
  useEffect(() => {
    loadFormData();
  }, []);

  const loadFormData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: demandeData, error } = await supabase
        .from('demandes_rcs')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'draft')
        .single();

      if (error) {
        console.log('No existing draft found, starting new form');
        return;
      }

      if (demandeData) {
        setFormData(demandeData);
        
        // Load associes
        const { data: associesData } = await supabase
          .from('associes')
          .select('*')
          .eq('demande_id', demandeData.id);
        
        if (associesData) {
          setAssocies(associesData);
        }

        // Load documents
        const { data: documentsData } = await supabase
          .from('documents')
          .select('*')
          .eq('demande_id', demandeData.id);
        
        if (documentsData) {
          setDocuments(documentsData);
        }
      }
    } catch (error) {
      console.error('Error loading form data:', error);
    }
  };

  const saveFormData = async (stepData: Partial<RcsFormData>) => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour sauvegarder vos données",
          variant: "destructive"
        });
        return;
      }

      const updatedFormData = { ...formData, ...stepData };
      
      if (formData.id) {
        // Update existing record
        const { error } = await supabase
          .from('demandes_rcs')
          .update(updatedFormData)
          .eq('id', formData.id);

        if (error) throw error;
      } else {
        // Create new record
        const { data, error } = await supabase
          .from('demandes_rcs')
          .insert([{ ...updatedFormData, user_id: user.id }])
          .select()
          .single();

        if (error) throw error;
        updatedFormData.id = data.id;
      }

      setFormData(updatedFormData);
      
      toast({
        title: "Sauvegardé",
        description: "Vos données ont été sauvegardées avec succès",
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
      if (!formData.id) {
        toast({
          title: "Erreur",
          description: "Veuillez d'abord sauvegarder les informations principales",
          variant: "destructive"
        });
        return;
      }

      // Delete existing associes
      await supabase
        .from('associes')
        .delete()
        .eq('demande_id', formData.id);

      // Insert new associes
      if (newAssocies.length > 0) {
        const { error } = await supabase
          .from('associes')
          .insert(newAssocies.map(associe => ({
            ...associe,
            demande_id: formData.id
          })));

        if (error) throw error;
      }

      setAssocies(newAssocies);
      
      toast({
        title: "Sauvegardé",
        description: "Les informations des associés ont été sauvegardées",
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