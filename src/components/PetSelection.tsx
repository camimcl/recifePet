import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PetType } from '../types/pet';
import CapibaraIcon from '../assets/capibara-icon.png';
import CrabIcon from '../assets/crab-icon.png';
import SharkIcon from '../assets/shark-icon.png';

const icons = {
  'capibara':CapibaraIcon,
  'crab': CrabIcon,
  'shark': SharkIcon
}


const PetSelection: React.FC = () => {
  const navigate = useNavigate();

  const selectPet = (type: PetType) => {
    navigate(`/pet/${type.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-12">Escolha seu Pet</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {['capibara','crab','shark'
        ].map((petType) => (
          <button
            key={petType}
            onClick={() => selectPet(petType as PetType)}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-4"
          >
            <img 
                   src={icons[petType.toLowerCase() as PetType]}
                   alt={petType}
                   className="pet-image"
                   width='100px'
                 />
            <span className="text-xl font-semibold text-gray-800">{petType}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PetSelection;