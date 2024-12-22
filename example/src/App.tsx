import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { OverlayRoot, useOverlay } from 'react-native-overlay-service'

export default function App() {
  const { openOverlay, closeAllOverlay, closeOverlay } = useOverlay({
    debounce: 200,
  })

  const openModal = () => {
    openOverlay(
      <TouchableOpacity
        onPress={() => {
          closeAllOverlay()
        }}
        style={styles.content}
      >
        <Text style={styles.textStyle}>Hello world! </Text>
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

  return (
    <View style={styles.container}>
      <OverlayRoot animationType={'fade'} />
      <TouchableOpacity
        style={{ width: 100, height: 100, backgroundColor: 'red' }}
        onPress={() => {
          openModal()
        }}
      >
        <Text>Open Modal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ width: 100, height: 100, backgroundColor: 'green' }}
        onPress={() => {
          openActionSheet()
        }}
      >
        <Text>Open ActionSheet</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ width: 100, height: 100, backgroundColor: 'blue' }}
        onPress={() => {}}
      >
        <Text>Open Toast</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ width: 100, height: 100, backgroundColor: 'green' }}
        onPress={() => {}}
      >
        <Text>Open Popup</Text>
      </TouchableOpacity>
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
