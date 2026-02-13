
export enum AppScreen {
  HOME = 'home',
  PLANNER = 'planner',
  NAVIGATION = 'navigation',
  PROFILE = 'profile',
  SETTINGS = 'settings',
  MARKETPLACE = 'marketplace'
}

export interface EcoOption {
  id: string;
  type: 'bike' | 'bus' | 'scooter' | 'walk' | 'ev';
  name: string;
  detail: string;
  distance?: string;
  time?: string;
  ecoScore?: number;
  savings?: string;
  calories?: string;
  impact?: string;
}

export interface Destination {
  id: string;
  name: string;
  address: string;
  icon: string;
  ecoScore: number;
}
