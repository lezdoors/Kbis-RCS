export const ModernStats = () => {
  const stats = [
    {
      number: "50,000+",
      label: "Documents traités",
      description: "Entreprises satisfaites"
    },
    {
      number: "2h",
      label: "Livraison moyenne",
      description: "Le plus rapide du marché"
    },
    {
      number: "4.9/5",
      label: "Note Trustpilot",
      description: "Plus de 2,500 avis"
    },
    {
      number: "7j/7",
      label: "Support disponible",
      description: "Équipe dédiée en français"
    }
  ];

  return (
    <section className="section-modern bg-muted/30">
      <div className="container-modern">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="card-modern">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-feature font-semibold text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};