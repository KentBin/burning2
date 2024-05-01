import zustand, {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware"
import { zustandStorage } from "./mkmv-storage";

export interface User {
  uid: string;
  name: string;
  contactNumber: string;
  point: number;
}

export interface AuthStore {
    user: User | null;
    setUser: (user: User) => void;
    //isSignedIn: boolean;
    //setIsSignedIn: (isSignedIn: boolean) => void;
  }

  export const useAuthStore = create<AuthStore>()(
   /*  user: null,
    //isSignedIn: false,
    setUser: (user) => set({ user }),
    //setIsSignedIn: (isSignedIn: boolean) => set({ isSignedIn })
  })  */
  persist((set, get) => ({
    user: null,
    //setUser: (user: User) => {set((state) => ({user: state.user}))}
    setUser: (user) => set({ user }),
  }), {
    name: 'user-storage', 
    storage: createJSONStorage(() => zustandStorage),
  })


);

 