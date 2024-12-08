export interface OverlayStoreTypes {
  modals: OverlayComponent[]
  openOverlay: (component: React.ReactNode, option: OptionOverlay) => void
  modalOpenId: string[]
  closeOverlay: () => void
  closeAllOverlay: () => void
}

export interface OverlayComponent {
  id: string
  component: React.ReactNode
  enableCloseWhenPressOutside: boolean | undefined
  type: 'modal' | 'actionsheet'
}

export type OptionOverlay = {
  type: OverlayComponent['type']
  enableCloseWhenPressOutside?: boolean
}
