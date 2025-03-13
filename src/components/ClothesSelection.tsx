import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Glasses } from 'lucide-react';

const ClothesSelection: React.FC = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();

  const accessories = [
    { id: 'glasses', name: 'Óculos de Sol', icon: Glasses, color: 'text-yellow-500' },
  ];

  const handleAccessorySelect = (accessoryId: string) => {
    // Navigate back to the main page with the selected accessory
    navigate(`/pet/${type}`, { state: { outfit: accessoryId } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-8">
      <button 
        onClick={() => navigate(`/pet/${type}`)}
        className="mb-8 flex items-center text-gray-600 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft className="mr-2" size={24} />
        Back to Pet
      </button>

      <h1 className="text-4xl font-bold text-gray-800 mb-8">Escolha um acessório</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accessories.map(({ id, name, icon: Icon, color }) => (
          <button
            key={id}
            onClick={() => handleAccessorySelect(id)}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col items-center gap-4">
              <Icon size={48} className={`${color}`} />
              <span className="text-xl font-semibold text-gray-800">{name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ClothesSelection;