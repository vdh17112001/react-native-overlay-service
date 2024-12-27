import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import {
  OverlayRoot,
  ToastRoot,
  useOverlay,
  useToast,
} from 'react-native-overlay-service'
import { ToastComponentTypes } from '../../src/context/types/toastTypes'

export default function App() {
  const { openOverlay, closeAllOverlay, closeOverlay } = useOverlay({
    debounce: 200,
  })

  const { showToastWithMessage } = useToast({ timeToHide: 5000 })

  const Touch = ({
    text,
    bg,
    onPress,
  }: {
    text: string
    bg: string
    onPress: () => void
  }) => {
    return (
      <TouchableOpacity
        style={{
          width: 100,
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: bg,
        }}
        onPress={onPress}
      >
        <Text>{text}</Text>
      </TouchableOpacity>
    )
  }

  const openModal = () => {
    openOverlay(
      <TouchableOpacity
        onPress={() => {
          closeAllOverlay()
        }}
        style={styles.content}
      >
        <Text style={styles.textStyle}>Hello world!</Text>
      </TouchableOpacity>,
      {
        enableCloseWhenPressOutside: true,
        type: 'modal',
      }
    )
  }

  const openActionSheet = () => {
    openOverlay(
      <TouchableOpacity
        onPress={() => {
          closeOverlay('actionsheet')
        }}
        style={styles.content}
      >
        <Text style={styles.textStyle}>Hello action sheet! </Text>
      </TouchableOpacity>,
      {
        enableCloseWhenPressOutside: true,
        type: 'actionsheet',
      }
    )
  }

  const ToastSomething = (type: ToastComponentTypes['type']) => {
    const test = (v: ToastComponentTypes) => {
      console.log('#Hoang: ', v)
    }
    showToastWithMessage(type, 'Hello', {
      showIcon: true,
      usePress: true,
      onPress: test,
    })
  }

  return (
    <View style={styles.container}>
      <Touch
        bg="green"
        text="Open Modal"
        onPress={() => {
          openModal()
        }}
      />
      <Touch
        bg="blue"
        text="Open ActionSheet"
        onPress={() => {
          openActionSheet()
        }}
      />

      <View style={{ width: 400, height: 100, flexDirection: 'row' }}>
        <Touch
          bg="green"
          text="Open success"
          onPress={() => {
            ToastSomething('success')
          }}
        />
        <Touch
          bg="red"
          text="Open err"
          onPress={() => {
            ToastSomething('error')
          }}
        />
        <Touch
          bg="blue"
          text="Open info"
          onPress={() => {
            ToastSomething('info')
          }}
        />
        <Touch
          bg="yellow"
          text="Open warn"
          onPress={() => {
            ToastSomething('warning')
          }}
        />
      </View>
      <Touch bg="pink" text="Open Popup" onPress={() => {}} />
      <OverlayRoot animationType={'fade'} />
      <ToastRoot />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  content: {
    width: 200,
    height: 600,
    backgroundColor: 'blue',
    justifyContent: 'flex-end',
  },
  textStyle: {
    fontSize: 20,
    color: 'red',
  },
})
