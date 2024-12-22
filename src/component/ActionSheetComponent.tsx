import {
  StyleSheet,
  Pressable,
  View,
  Animated,
  PanResponder,
} from 'react-native'
import type { OverlayComponent } from '../context/types/type'
import { height, width } from '../utils/utils'
import { useRef } from 'react'
import actionSheetRef from '../context/ref/actionSheetRef'

type Props = {
  v: OverlayComponent
  backgroundActionSheet?: string
}

export const ActionSheetComponent = (props: Props) => {
  const { v, backgroundActionSheet } = props

  // Animated value for drag
  const translateY = useRef(new Animated.Value(0)).current

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          // Only swipe down is allowed
          translateY.setValue(gestureState.dy)
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          // If the swipe down exceeds 100px, close the ActionSheet
          swipeDown()
        } else {
          // Returns to original position if not swiped far enough
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start()
        }
      },
    })
  ).current

  const swipeDown = () => {
    actionSheetRef.current?.close()
    Animated.timing(translateY, {
      toValue: height,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Pressable
      onPress={() => {
        if (v.enableCloseWhenPressOutside) {
          swipeDown()
        }
      }}
      style={styles.container}
    >
      <Animated.View
        {...panResponder.panHandlers} // Connect PanResponder
        style={[
          {
            transform: [{ translateY }],
            backgroundColor: backgroundActionSheet ?? 'white',
          },
          styles.contentContainer,
        ]}
      >
        <View style={styles.dash} />
        {v.component}
      </Animated.View>
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
