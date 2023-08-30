import { create } from "zustand";

interface ILoadingStore {
  isLoading: boolean;
  setIsLoading: (status: boolean) => void;
}

const LoadingStore = create<ILoadingStore>((set) => ({
  isLoading: false,
  setIsLoading: (status: boolean) => set({ isLoading: status })
}));

export default LoadingStore;
