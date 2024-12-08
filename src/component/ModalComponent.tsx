import { StyleSheet, Pressable } from 'react-native'
import type { OverlayComponent } from '../context/types/type'
import { useOverlayStore } from '../utils/useOverlayStore'
import { height, width } from '../utils/utils'

type Props = {
  v: OverlayComponent
}

export const ModalComponent = (props: Props) => {
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
