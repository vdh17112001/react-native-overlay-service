import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from 'react'
import { Animated, StyleSheet } from 'react-native'
import { height, width } from '../utils/utils'
import { useOverlayStore } from '../context/hook/useOverlayStore'

export interface OverlayViewProps {
  children: React.ReactNode
  type: 'modal' | 'actionsheet'
  animationType: 'slide' | 'fade'
  zIndex?: number
}

export const OverlayView = forwardRef((props: OverlayViewProps, ref) => {
  const { children, animationType, type, zIndex } = props
  const t = type === 'actionsheet'
  const value = t ? 300 : animationType === 'slide' ? 300 : 0
  const toValue = t ? height : animationType === 'slide' ? height : 0
  const duration = t ? 200 : 100
  const slideAnim = useRef(new Animated.Value(value)).current
  const closeOverlay = useOverlayStore((state) => state.closeOverlay)

  useEffect(() => {
    open()
  }, [])

  const close = () => {
    Animated.timing(slideAnim, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: true,
    }).start(() => closeOverlay())
  }

  const open = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    }).start()
  }

  // Expose methods to the ref
  useImperativeHandle(ref, () => ({
    close,
  }))

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY: slideAnim }], zIndex: zIndex },
      ]}
    >
      {children}
    </Animated.View>
  )
})

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width,
    height: height,
    alignSelf: 'flex-end',
    bottom: 0,
  },
})
