import { StyleSheet, Pressable, View } from 'react-native'
import type { OverlayComponent } from '../context/types/type'
import { useOverlayStore } from '../utils/useOverlayStore'
import { height, width } from '../utils/utils'

type Props = {
  v: OverlayComponent
  backgroundActionSheet?: string
}

export const ActionSheetComponent = (props: Props) => {
  const { v, backgroundActionSheet } = props
  const close = useOverlayStore((state) => state.closeOverlay)
  return (
    <Pressable
      onPress={() => {
        if (v.enableCloseWhenPressOutside) {
          close()
        }
      }}
      style={styles.container}
    >
      <Pressable
        style={[
          { backgroundColor: backgroundActionSheet ?? 'white' },
          styles.contentContainer,
        ]}
      >
        <View style={styles.dash} />
        {v.component}
      </Pressable>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: width,
    height: height,
    position: 'absolute',
  },
  contentContainer: {
    width: width,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  dash: {
    width: width * 0.2,
    height: 7,
    backgroundColor: '#737373',
    alignSelf: 'center',
    marginBottom: 15,
    marginTop: 5,
    borderRadius: 18,
  },
})
