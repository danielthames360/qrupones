import { SessionInterface } from '@/interfaces';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface GlobalState {
  verificationCode: string | undefined;
  setVerificationCode: (code: string | undefined) => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useGlobalStore = create<GlobalState>()(
  devtools(
    persist(
      (set) => ({
        verificationCode: undefined,
        setVerificationCode: (code: string | undefined) => set({ verificationCode: code }),
        hasHydrated: false,
        setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
      }),
      {
        name: 'qruponesStore',
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.setHasHydrated(true);
          }
        },
      }
    ),
    { name: 'qruponesStore' }
  )
);
