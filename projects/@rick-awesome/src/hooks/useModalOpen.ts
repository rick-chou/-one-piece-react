import type { OpenTypeConfig } from '@rickzhou/awesome/store/slice/modalOpenSlice';
import { onOpenChange } from '@rickzhou/awesome/store/slice/modalOpenSlice';
import { useCallback } from 'react';
import { useRickDispatch, useRickSelector } from './useStore';

export const useModalOpen = (openType: OpenTypeConfig) => {
  const dispatch = useRickDispatch();
  const open = useRickSelector(state => state.modalOpen[openType]);
  const onShow = useCallback(() => {
    dispatch(onOpenChange({ type: openType, open: true }));
  }, [dispatch, openType]);
  const onHidden = useCallback(() => {
    dispatch(onOpenChange({ type: openType, open: false }));
  }, [dispatch, openType]);
  const onToggle = useCallback(() => {
    if (open) {
      onHidden();
    } else {
      onShow();
    }
  }, [onHidden, onShow, open]);

  return {
    open,
    onShow,
    onHidden,
    onToggle,
  };
};
