export interface OverlayStoreTypes {
  modals: OverlayComponent[]
  openOverlay: (component: React.ReactNode, option: OptionOverlay) => void
  modalOpenId: string[]
  closeOverlay: () => void
  closeAllOverlay: () => void
}

export interface ActionSheetStoreTypes {
  actionSheet: OverlayComponent[]
  openActionSheet: (component: React.ReactNode, option: OptionOverlay) => void
  ASOpenId: string[]
  closeActionSheet: () => void
  closeAllActionSheet: () => void
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
