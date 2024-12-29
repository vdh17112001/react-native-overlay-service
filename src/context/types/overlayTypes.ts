export interface OverlayStoreInterface {
  modals: OverlayComponent[]
  openOverlay: (component: React.ReactNode, option: OptionOverlay) => void
  modalOpenId: string[]
  closeOverlay: () => void
  closeAllOverlay: () => void
}

export type OverlayComponent = {
  id: string
  component: React.ReactNode
  enableCloseWhenPressOutside: boolean | undefined
  type: 'modal' | 'actionsheet'
}

export type OptionOverlay = {
  enableCloseWhenPressOutside?: boolean
  type: 'modal' | 'actionsheet'
}
