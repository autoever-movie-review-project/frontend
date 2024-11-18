import { create } from 'zustand';

interface PointState {
  point: number;
  incrementCount: (num: number) => void;
  pointInit: (num: number) => void;
}

export const usePointStore = create<PointState>((set) => ({
  point: 0,

  incrementCount: (num) => set((state) => ({ point: state.point + num })),
  pointInit: (num) => set(() => ({ point: num })),
}));
