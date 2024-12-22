import modalRef from '../ref/modalRef'
import { OverlayComponent } from '../types/overlayTypes'
import { useOverlayStore } from '../store/useOverlayStore'
import actionSheetRef from '../ref/actionSheetRef'

let debounceOpen: NodeJS.Timeout | undefined
let debounceClose: NodeJS.Timeout | undefined

type HookTypes = {
  debounce: number
}
export const useOverlay = (props: HookTypes) => {
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
