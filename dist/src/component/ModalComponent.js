import { StyleSheet, Pressable } from 'react-native'
import { useOverlayStore } from '../utils/useOverlayStore'
import { height, width } from '../utils/utils'
export const ModalComponent = (props) => {
  const { v } = props
  const close = useOverlayStore((state) => state.closeOverlay)
  return (
    <Pressable
      key={v.id}
      onPress={() => {
        if (v.enableCloseWhenPressOutside) {
          close()
        }
      }}
      style={styles.container}
    >
      <Pressable>{v.component}</Pressable>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: width,
    height: height,
  },
})
