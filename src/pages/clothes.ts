// You'll need to update this file to change the atom type
import { atom } from 'jotai';

export type ClothingItem = {
  id: string;
  name: string;
  timestamp: number;
};

export type RFIDItem = {
  name: string;
  sizes: Array<{
    size: string;
    amount: number;
  }>;
  colors?: string[];
};

export const currentItemsAtom = atom<RFIDItem[]>([]);
export const stolenItemsAtom = atom<ClothingItem[]>([]);
