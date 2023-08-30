import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  isLogin: boolean;
  setIsLogin: (status: boolean) => void;
}

const useLoginStore = create(
  persist<UserState>(
    (set) => ({
      isLogin: false,
      setIsLogin: (status: boolean) => set({ isLogin: status })
    }),
    {
      name: "user-login-store"
    }
  )
);

export default useLoginStore;
