import {
  Image,
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { ToastComponentTypes } from '../context/types/toastTypes'
import { height, width } from '../utils/utils'
import { infor, success, warn, err } from '../assets/image'
import { useCallback } from 'react'

type Props = {
  v: ToastComponentTypes
  bottom: number
  onLayout: (e: LayoutChangeEvent) => void
}

const border = 5
const padText = 10
enum ToastEnum {
  Success = 0,
  Warn = 1,
  Error = 2,
  Info = 3,
}
const colorToast = ['#76cc00', '#fec048', '#f74850', '#2096f3']
const titleToast = ['Success', 'Warning', 'Error', 'Info']

export const ToastComponent = (props: Props) => {
  const { v, bottom, onLayout } = props

  const getTypeToast = useCallback(() => {
    const type = v.type
    const idx =
      type === 'success'
        ? ToastEnum.Success
        : type === 'warning'
          ? ToastEnum.Warn
          : type === 'error'
            ? ToastEnum.Error
            : ToastEnum.Info
    const img = {
      success: success,
      warning: warn,
      error: err,
      info: infor,
    }
    return {
      title: titleToast[idx],
      color: colorToast[idx],
      img: img[type],
    }
  }, [v.type])
  const toast: {
    title: string | undefined
    color: string | undefined
    img: any
  } = getTypeToast()

  const usePress = v.option?.usePress ?? true
  const showIcon = v.option?.showIcon ?? true

  return (
    <TouchableOpacity
      onPress={() => {
        v.option?.onPress?.(v)
      }}
      disabled={!usePress}
      onLayout={onLayout}
      style={[{ bottom: bottom, shadowColor: 'black' }]}
    >
      {showIcon && (
        <View style={[styles.barColor, { backgroundColor: toast.color }]} />
      )}
      {showIcon && (
        <View style={styles.iconView}>
          <Image source={toast.img} style={styles.img} />
        </View>
      )}

      <View style={[styles.content, { width: showIcon ? '73%' : '93%' }]}>
        <Text style={styles.textTitle}>{toast.title}</Text>
        <Text
          numberOfLines={2}
          style={[{ fontSize: Platform.OS === 'ios' ? 14 : 16 }, styles.text]}
        >
          {v.message}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: border,
    zIndex: 9999,
    width: width * 0.85,
    height: height * 0.1,
    shadowRadius: border,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 2,
    shadowColor: 'black',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: '600',
    color: '#7d7d7d',
    paddingLeft: padText,
    marginTop: height * 0.01,
    height: height * 0.05,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    paddingHorizontal: padText,
    paddingTop: padText,
  },
  barColor: {
    width: '3%',
    height: '100%',
    borderBottomLeftRadius: border,
    borderTopLeftRadius: border,
  },
  iconView: {
    width: '20%',
    height: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  content: {
    height: '100%',
    borderBottomRightRadius: border,
    borderTopRightRadius: border,
    overflow: 'hidden',
  },
  img: {
    width: height * 0.05,
    height: height * 0.05,
  },
})
