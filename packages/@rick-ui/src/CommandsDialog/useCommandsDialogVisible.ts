import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type ModelType = {
  open: boolean;
  toggle: (open?: boolean) => void;
};

export const useCommandsDialogVisible = create<ModelType>()(
  immer(set => ({
    open: false,
    toggle(open) {
      set(state => {
        state.open = typeof open === 'boolean' ? open : !state.open;
      });
    },
  })),
);
