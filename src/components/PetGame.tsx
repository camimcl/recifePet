import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Pizza, Shirt, PlayCircle } from 'lucide-react';
import { Pet, PetType } from '../types/pet';
import CapibaraIcon from '../assets/capibara.png'
import CrabIcon from '../assets/crab.png'
import MouseIcon from '../assets/mouse.jpg'

const icons = {
  'capibara':CapibaraIcon,
  'crab': CrabIcon,
  'mouse': MouseIcon
}

const PetGame: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet>({
    type: type as PetType,
    name: type || 'Pet',
    happiness: 50,
    hunger: 50
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setPet(prev => ({
        ...prev,
        happiness: Math.max(0, prev.happiness - 1),
        hunger: Math.max(0, prev.hunger - 1)
      }));
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const handleAction = (action: 'FEED' | 'PET' | 'PLAY') => {
    setPet(prev => ({
      ...prev,
      happiness: action !== 'FEED' ? Math.min(100, prev.happiness + 10) : prev.happiness,
      hunger: action === 'FEED' ? Math.min(100, prev.hunger + 20) : prev.hunger
    }));
  };

  return (
    <div className="pet-container">
      <div className="absolute top-4 right-4 flex gap-4">
        <div className="level-indicator">
          <Heart className="icon" size={24} />
          <div 
            className="level-fill bg-red-400"
            style={{ height: `${pet.happiness}%` }}
          />
        </div>
        <div className="level-indicator">
          <Pizza className="icon" size={24} />
          <div 
            className="level-fill bg-yellow-400"
            style={{ height: `${pet.hunger}%` }}
          />
        </div>
      </div>

      <img 
        src={icons[pet.type.toLowerCase() as PetType]}
        alt={pet.type}
        className="pet-image"
      />

      <div className="action-buttons">
        <button className="feed" onClick={() => handleAction('FEED')}>
          <Pizza className="inline-block mr-2" size={20} />
          Feed
        </button>
        <button className="pet" onClick={() => handleAction('PET')}>
          <Heart className="inline-block mr-2" size={20} />
          Pet
        </button>
        <button className="play" onClick={() => handleAction('PLAY')}>
          <PlayCircle className="inline-block mr-2" size={20} />
          Play
        </button>
        <button className="clothes" onClick={() => navigate(`/pet/${type}/clothes`)}>
          <Shirt className="inline-block mr-2" size={20} />
          Clothes
        </button>
      </div>
    </div>
  );
};

export default PetGame;