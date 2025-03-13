import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Pizza, Shirt, PlayCircle, Coins, Image, Bell, MapPin, Calendar, Trophy } from 'lucide-react';
import { Pet, PetType } from '../types/pet';
import CapibaraIcon from '../assets/capibara.png';
import CrabIcon from '../assets/crab.png';
import CapibaraGlassesIcon from '../assets/capibara-glasses.png';
import CrabGlassesIcon from '../assets/crab-glasses.png';


type IconKey = PetType | `${PetType}-glasses`;

const icons: Record<IconKey, string> = {
  'capibara': CapibaraIcon,
  'crab': CrabIcon,
  'capibara-glasses': CapibaraGlassesIcon,
  'crab-glasses': CrabGlassesIcon
};

const backgrounds = [
  'https://img.freepik.com/vetores-gratis/ilustracao-de-cuba-de-design-plano_23-2149404461.jpg',
  'https://img.freepik.com/vetores-premium/ilustracao-do-brasil-em-gradiente_23-2151431362.jpg',
  'https://www.quintoandar.com.br/guias/wp-content/uploads/2022/02/Praca-do-Maraco-Zero-Rosa-dos-Ventos-Abre.jpg',
  'https://images.unsplash.com/photo-1557683316-973673baf926'
];

interface Notification {
  id: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'event' | 'tourist' | 'reward' | 'achievement';
  icon: React.ReactNode;
  link?: string;
}

const sampleNotifications: Omit<Notification, 'id' | 'timestamp' | 'read'>[] = [
  {
    message: "Novo evento cultural no Marco Zero! Ganhe 50 Moedas Capiba participando.",
    type: 'event',
    icon: <Calendar className="text-purple-500" size={20} />,
    link: "/events/marco-zero"
  },
  {
    message: "Visite o Paço do Frevo hoje e ganhe 30 Moedas Capiba!",
    type: 'tourist',
    icon: <MapPin className="text-red-500" size={20} />,
    link: "/places/paco-frevo"
  },
  {
    message: "Festival Gastronômico em Olinda - Prove pratos típicos e ganhe moedas!",
    type: 'event',
    icon: <Calendar className="text-purple-500" size={20} />,
    link: "/events/food-festival"
  },
  {
    message: "Novo desafio: Visite 3 museus este mês e ganhe 100 Moedas Capiba!",
    type: 'achievement',
    icon: <Trophy className="text-yellow-500" size={20} />,
    link: "/challenges/museum-tour"
  }
];

const PetGame: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet>({
    type: type as PetType,
    name: type || 'Pet',
    happiness: 50,
    hunger: 50,
    outfit: ''
  });
  const [coins, setCoins] = useState(0);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeChatBalloon, setActiveChatBalloon] = useState<string | null>(null);

  useEffect(() => {
    const initialNotifications = sampleNotifications.map(notification => ({
      ...notification,
      id: Date.now().toString() + Math.random(),
      timestamp: new Date(),
      read: false
    }));
    setNotifications(initialNotifications);

    const timer = setInterval(() => {
      setPet(prev => ({
        ...prev,
        happiness: Math.max(0, prev.happiness - 1),
        hunger: Math.max(0, prev.hunger - 1)
      }));
    }, 10000);

    const notificationTimer = setInterval(() => {
      const randomNotification = sampleNotifications[Math.floor(Math.random() * sampleNotifications.length)];
      addNotification(randomNotification);
    }, 30000);

    return () => {
      clearInterval(timer);
      clearInterval(notificationTimer);
    };
  }, []);

  useEffect(() => {
    if (pet.happiness === 100 && pet.hunger === 100) {
      const reward = 5;
      setCoins(prev => prev + reward);
      addNotification({
        message: `Parabéns! Você ganhou ${reward} Moedas Capiba por cuidar bem do seu pet!`,
        type: 'reward',
        icon: <Coins className="text-yellow-500" size={20} />
      });
      setPet(prev => ({
        ...prev,
        happiness: 99,
        hunger: 99
      }));
    }
  }, [pet.happiness, pet.hunger]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const handleAction = (action: 'FEED' | 'PET' | 'PLAY') => {
    setPet(prev => ({
      ...prev,
      happiness: action !== 'FEED' ? Math.min(100, prev.happiness + 10) : prev.happiness,
      hunger: action === 'FEED' ? Math.min(100, prev.hunger + 20) : prev.hunger
    }));
  };

  const changeBackground = () => {
    setBackgroundIndex((prev) => (prev + 1) % backgrounds.length);
  };

  const handleNotificationClick = (notification: Notification) => {
    setActiveChatBalloon(notification.message);
    setNotifications(prev =>
      prev.map(n =>
        n.id === notification.id ? { ...n, read: true } : n
      )
    );
    setTimeout(() => setActiveChatBalloon(null), 5000);

    if (notification.link) {
      console.log(`Navigating to: ${notification.link}`);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getPetImage = () => {
    const baseType = pet.type.toLowerCase() as PetType;
    const key = pet.outfit === 'glasses' ? `${baseType}-glasses` as IconKey : baseType;
    return icons[key];
  };

  return (
    <div 
      className="pet-container min-h-screen bg-cover bg-center transition-all duration-500 relative"
      style={{ backgroundImage: `url(${backgrounds[backgroundIndex]})` }}
    >
      <div className="absolute top-4 left-20 bg-white/90 rounded-full px-4 py-2 flex items-center gap-2">
        <Coins className="text-yellow-500" size={24} />
        <span className="font-bold">{coins}</span>
      </div>

      <div className="absolute top-4 left-2 bg-white/90 rounded-full px-4 py-2">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative"
        >
          <Bell size={24} className="text-blue-500" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {showNotifications && (
        <div className="absolute top-20 left-4 bg-white/95 rounded-lg shadow-lg p-4 w-96 max-h-[70vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Conecta Recife</h3>
            <div className="flex gap-2">
              <button className="text-xs bg-blue-100 px-2 py-1 rounded">Eventos</button>
              <button className="text-xs bg-blue-100 px-2 py-1 rounded">Pontos Turísticos</button>
              <button className="text-xs bg-blue-100 px-2 py-1 rounded">Desafios</button>
            </div>
          </div>
          {notifications.length === 0 ? (
            <p className="text-gray-500">Nenhuma notificação no momento!</p>
          ) : (
            notifications.map(notification => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`cursor-pointer p-3 mb-2 rounded ${
                  notification.read ? 'bg-gray-100' : 'bg-blue-100'
                } hover:bg-blue-200 transition-colors`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">{notification.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.timestamp.toLocaleTimeString()}
                    </p>
                    {notification.link && (
                      <span className="text-xs text-blue-500 hover:underline">
                        Saiba mais →
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

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

      <div className="relative">
        <img 
          src={getPetImage()}
          alt={pet.type}
          className="pet-image"
        />
        {activeChatBalloon && (
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg p-4 shadow-lg max-w-xs">
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
            <p className="text-sm">{activeChatBalloon}</p>
          </div>
        )}
      </div>

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
        <button className="bg-purple-500 hover:bg-purple-600" onClick={changeBackground}>
          <Image className="inline-block mr-2" size={20} />
          Change Background
        </button>
      </div>
    </div>
  );
};

export default PetGame;