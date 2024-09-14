import { SessionInterface } from '@/interfaces';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface GlobalState {
  session: SessionInterface | undefined;
  setSession: (session: SessionInterface | undefined) => void;
}

export const useGlobalStore = create<GlobalState>()(
  devtools(
    persist(
      (set) => ({
        session: undefined,
        setSession: (session: SessionInterface | undefined) => set({ session: session }),
      }),
      { name: 'qruponesStore' }
    ),
    { name: 'qruponesStore' }
  )
);
