import { create } from 'zustand';
import type { StoreState } from './types';

export const useStore = create<StoreState>(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 })),
}));
