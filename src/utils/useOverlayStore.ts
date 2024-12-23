import { create } from 'zustand'
import type { OverlayStoreTypes, OptionOverlay } from '../context/types/type'

export const useOverlayStore = create<OverlayStoreTypes>((set) => ({
  modals: [],
  modalOpenId: [],
  openOverlay: (component: React.ReactNode, option: OptionOverlay) =>
    set((state) => {
      const uId = `modal-${Date.now()}`
      return {
        modals: [
          ...state.modals,
          {
            id: uId,
            component,
            enableCloseWhenPressOutside: option?.enableCloseWhenPressOutside,
            type: option.type,
          },
        ],
        modalOpenId: [...state.modalOpenId, uId],
      }
    }),
  closeOverlay: () =>
    set((state) => {
      const m = state.modals.filter(
        (v) => v.id !== state.modalOpenId[state.modalOpenId.length - 1]
      )

      const mOId = state.modalOpenId.filter(
        (v) => v !== state.modalOpenId[state.modalOpenId.length - 1]
      )

      return {
        modals: m,
        modalOpenId: mOId,
      }
    }),
  closeAllOverlay: () => set(() => ({ modals: [], modalOpenId: [] })),
}))
