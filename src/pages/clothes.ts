import { atom } from 'jotai';

// Define types for our items
export interface ClothingItem {
  id: string;
  name: string;
  timestamp: number;
}

// Create atoms for tracking items and notifications
export const stolenItemsAtom = atom<ClothingItem[]>([]);
export const currentItemsAtom = atom<string[]>([]);
