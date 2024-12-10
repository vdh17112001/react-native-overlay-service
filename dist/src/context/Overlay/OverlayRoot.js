import { Modal, View } from 'react-native'
import { useOverlayStore } from '../../utils/useOverlayStore'
import { ModalComponent } from '../../component/ModalComponent'
import { ActionSheetComponent } from '../../component/ActionSheetComponent'
export const OverlayRoot = () => {
  const m = useOverlayStore((state) => state.modals)
  if (!m || m.length === 0) {
    return null
  }
  return (
    <Modal visible={true} transparent={true} animationType={'slide'}>
      {m.map((_v) => {
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
