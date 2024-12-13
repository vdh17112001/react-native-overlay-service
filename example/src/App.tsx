import { useEffect } from 'react'
import { View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native'
import { OverlayRoot, useOverlay } from 'react-native-overlay-service'

export default function App() {
  const { openOverlay, closeAllOverlay, closeOverlay } = useOverlay()
  useEffect(() => {}, [])
  return (
    <View style={styles.container}>
      <OverlayRoot />
      <Button
        onPress={() => {
          openOverlay(
            <TouchableOpacity
              onPress={() => {
                closeOverlay()
              }}
              style={styles.content}
            >
              <Text style={styles.textStyle}>Hello world! </Text>
            </TouchableOpacity>,
            {
              type: 'modal',
              enableCloseWhenPressOutside: true,
            }
          )
        }}
        title="open modal"
        color="blue"
      />

      <Button
        onPress={() => {
          openOverlay(
            <TouchableOpacity
              onPress={() => {
                openOverlay(
                  <TouchableOpacity
                    onPress={() => {
                      closeAllOverlay()
                    }}
                    style={styles.content}
                  >
                    <Text style={styles.textStyle}>Close all! </Text>
                  </TouchableOpacity>,
                  {
                    type: 'modal',
                    enableCloseWhenPressOutside: true,
                  }
                )
              }}
              style={styles.content}
            >
              <Text style={styles.textStyle}>Hello action sheet! </Text>
            </TouchableOpacity>,
            {
              type: 'actionsheet',
              enableCloseWhenPressOutside: false,
            }
          )
        }}
        title="open actionsheet"
        color="blue"
      />
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
    height: 200,
    backgroundColor: 'blue',
  },
  textStyle: {
    fontSize: 20,
    color: 'red',
  },
})
