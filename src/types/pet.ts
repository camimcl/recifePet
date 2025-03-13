export type PetType = 'crab' | 'capibara' | 'shark';

export interface Pet {
  type: PetType;
  name: string;
  happiness: number;
  hunger: number;
  outfit?: string;
}

export interface PetAction {
  type: 'FEED' | 'PET' | 'PLAY' | 'CHANGE_OUTFIT';
  value: number;
}