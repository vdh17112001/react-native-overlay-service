import { create } from 'zustand'
import {
  OptionToast,
  ToastComponentTypes,
  ToastStoreInterface,
} from '../types/toastTypes'

export const useToastStore = create<ToastStoreInterface>((set) => ({
  toasts: [],
  toastHeight: 0,
  showToast: (
    types: ToastComponentTypes['type'],
    component?: React.ReactNode,
    message?: string,
    option?: OptionToast
  ) =>
    set((state) => {
      const condition = state.toastHeight > 70 ? 10 : 12
      if (state.toasts.length > condition) {
        throw new Error('Too many Toast')
      }
      const uId = `toast-${Date.now()}`
      return {
        toasts: [
          {
            id: uId,
            component,
            type: types,
            message,
            option,
          },
          ...state.toasts,
        ],
      }
    }),
  hideToast: () =>
    set((state) => {
      state.toasts.pop()
      return {
        toasts: [...state.toasts],
      }
    }),
  setToastHeight: (b: number) =>
    set(() => {
      return {
        toastHeight: b,
      }
    }),
}))
