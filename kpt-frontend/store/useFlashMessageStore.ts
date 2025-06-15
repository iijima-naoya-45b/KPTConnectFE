import { create } from 'zustand';

interface FlashMessageState {
    flashMessage: string;
    setFlashMessage: (msg: string) => void;
    clearFlashMessage: () => void;
}

export const useFlashMessageStore = create<FlashMessageState>((set) => ({
    flashMessage: '',
    setFlashMessage: (msg) => set({ flashMessage: msg }),
    clearFlashMessage: () => set({ flashMessage: '' }),
})); 