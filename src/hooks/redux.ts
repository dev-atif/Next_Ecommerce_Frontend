import { AppDispatch, RootState } from "@/redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

/* import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux'


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
