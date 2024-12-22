import { useOverlayStore } from '../../context/hook/useOverlayStore'
import type { OverlayComponent } from '../types/type'
import { ModalComponent } from '../../component/ModalComponent'
import { ActionSheetComponent } from '../../component/ActionSheetComponent'
import { OverlayView, OverlayViewProps } from '../../component/OverlayView'
import modalRef from '../ref/modalRef'
import actionSheetRef from '../ref/actionSheetRef'

interface OverlayRootProps {
  animationType: OverlayViewProps['animationType']
}

export const OverlayRoot = (props: OverlayRootProps) => {
  const { animationType } = props
  const m: OverlayComponent[] = useOverlayStore((state) => state.modals)

  if (!m || m.length === 0) {
    return null
  }

  return (
    <>
      {m.map((_v: OverlayComponent, i: number) => {
        return (
          <OverlayView
            ref={_v.type === 'modal' ? modalRef : actionSheetRef}
            type={_v.type}
            key={_v.id}
            zIndex={i + 1}
            animationType={animationType}
          >
            {_v.type === 'modal' && <ModalComponent v={_v} />}
            {_v.type === 'actionsheet' && <ActionSheetComponent v={_v} />}
          </OverlayView>
        )
      })}
    </>
  )
}
