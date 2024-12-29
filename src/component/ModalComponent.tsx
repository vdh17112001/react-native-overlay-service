import { StyleSheet, Pressable } from 'react-native'
import type { OverlayComponent } from '../context/types/overlayTypes'
import { height, width } from '../utils/utils'
import modalRef from '../context/ref/modalRef'

type Props = {
  v: OverlayComponent
}

export const ModalComponent = (props: Props) => {
  const { v } = props

  return (
    <Pressable
      onPress={() => {
        if (v.enableCloseWhenPressOutside) {
          modalRef.current?.close()
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
