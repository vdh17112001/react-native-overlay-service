import { Modal, View } from 'react-native'
import { useOverlayStore } from '../../utils/useOverlayStore'
import type { OverlayComponent } from '../types/type'
import { ModalComponent } from '../../component/ModalComponent'
import { ActionSheetComponent } from '../../component/ActionSheetComponent'

export const OverlayRoot = () => {
  const m: OverlayComponent[] = useOverlayStore((state) => state.modals)

  if (!m || m.length === 0) {
    return null
  }

  return (
    <Modal visible={true} transparent={true} animationType={'slide'}>
      {m.map((_v: OverlayComponent) => {
        return (
          <View key={_v.id}>
            {_v.type === 'modal' && <ModalComponent v={_v} />}
            {_v.type === 'actionsheet' && <ActionSheetComponent v={_v} />}
          </View>
        )
      })}
    </Modal>
  )
}
