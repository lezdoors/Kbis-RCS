import { useState, useEffect } from "react";

export const SocialProofTestimonials = () => {
  const testimonials = [
    "Marina a créé sa SASU en 18h",
    "Thomas a lancé sa SARL hier",  
    "Sophie recommande RCS Express",
    "Pierre a reçu son KBIS ce matin",
    "Julie a validé son dossier en 2 minutes"
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 transition-all duration-500">
        <p className="text-blue-800 font-medium text-sm">
          {testimonials[currentTestimonial]}
        </p>
      </div>
      
      <div className="text-center">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium underline transition-colors">
          Voir tous les témoignages
        </button>
      </div>
    </div>
  );
};