import type { AppDispatch, RootState } from '@rickzhou/awesome/store';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

export const useRickDispatch: () => AppDispatch = useDispatch;
export const useRickSelector: TypedUseSelectorHook<RootState> = useSelector;
