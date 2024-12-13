import { OverlayComponent } from '../context/types/type'
import { useOverlayStore } from './useOverlayStore'

export const useOverlay = () => {
  const open = useOverlayStore((state) => state.openOverlay)
  const closeOverlay = useOverlayStore((state) => state.closeOverlay)
  const closeAllOverlay = useOverlayStore((state) => state.closeAllOverlay)
  const openOverlay = (
    component: OverlayComponent['component'],
    option: {
      type: OverlayComponent['type']
      enableCloseWhenPressOutside?: boolean
    }
  ) => {
    open(component, {
      type: option.type,
      enableCloseWhenPressOutside: option.enableCloseWhenPressOutside,
    })
  }

  return {
    openOverlay,
    closeOverlay,
    closeAllOverlay,
  }
}
