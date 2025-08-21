import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OrderFormModal } from "@/components/OrderFormModal";

export const HeroSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsModalOpen(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mt-12 mb-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Nom d'entreprise, SIREN ou SIRET..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="h-14 text-lg px-6 border-2 border-gray-200 focus:border-primary rounded-xl"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="h-14 px-8 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl flex items-center gap-2 min-w-[140px]"
              disabled={!searchQuery.trim()}
            >
              <Search className="w-5 h-5" />
              Rechercher
            </Button>
          </div>
          
          <p className="text-gray-500 text-sm mt-4 text-center">
            ex: 123456789, Apple France, ou SASU TECH INNOVATION
          </p>
        </div>
      </div>

      {/* Order Form Modal */}
      <OrderFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};