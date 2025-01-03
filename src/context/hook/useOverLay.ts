import modalRef from '../ref/modalRef'
import { OverlayComponent } from '../types/overlayTypes'
import { useOverlayStore } from '../store/useOverlayStore'
import actionSheetRef from '../ref/actionSheetRef'

let debounceOpen: NodeJS.Timeout | undefined
let debounceClose: NodeJS.Timeout | undefined

interface HookTypes {
  debounce: number
}

export type UseOverlayReturn = {
  openOverlay: (
    component: OverlayComponent['component'],
    option: {
      type: OverlayComponent['type']
      enableCloseWhenPressOutside?: boolean
    }
  ) => void
  closeOverlay: (type: OverlayComponent['type']) => void
  closeAllOverlay: () => void
}
export const useOverlay = (props: HookTypes): UseOverlayReturn => {
  const { debounce = 200 } = props
  const open = useOverlayStore((state) => state.openOverlay)
  const closeAll = useOverlayStore((state) => state.closeAllOverlay)
  const openOverlay = (
    component: OverlayComponent['component'],
    option: {
      type: OverlayComponent['type']
      enableCloseWhenPressOutside?: boolean
    }
  ) => {
    clearTimeout(debounceOpen)
    debounceOpen = setTimeout(() => {
      open(component, {
        type: option.type,
        enableCloseWhenPressOutside: option.enableCloseWhenPressOutside,
      })
    }, debounce)
  }

  const closeOverlay = (type: OverlayComponent['type']) => {
    clearTimeout(debounceClose)
    debounceClose = setTimeout(() => {
      if (type === 'modal') {
        modalRef.current?.close()
        return
      }
      actionSheetRef.current?.close()
    }, debounce)
  }

  const closeAllOverlay = () => {
    closeAll()
  }
  return {
    openOverlay,
    closeOverlay,
    closeAllOverlay,
  }
}
