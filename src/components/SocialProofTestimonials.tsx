export const SocialProofTestimonials = () => {
  const testimonials = [
    "Marina a créé sa SASU en 18h",
    "Thomas a lancé sa SARL hier",  
    "Sophie recommande RCS Express",
    "Pierre a reçu son KBIS ce matin",
    "Julie a validé son dossier en 2 minutes"
  ];

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
        <p className="text-blue-800 font-medium text-sm">
          {testimonials[0]}
        </p>
      </div>
      
      <div className="text-center">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium underline">
          Voir tous les témoignages
        </button>
      </div>
    </div>
  );
};