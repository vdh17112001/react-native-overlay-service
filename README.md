# react-native-overlay-service

Overlay service using **Zustand** to conveniently open Modal or Actionsheet

## Installation

```sh
npm install react-native-overlay-service
```

```sh
yarn add react-native-overlay-service
```

## Usage

#### Firstly

Import and add `OverLayRoot` to App.tsx
```
...
import { OverlayRoot } from 'react-native-overlay-service'

const App = () => {

  return ( 
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={AuthStack} />
          </Stack.Navigator>
        </NavigationContainer>

       <OverlayRoot />  <-- Add this

      </SafeAreaProvider>
  )
}
```

And import `useOverlay` to use it

```
import { useOverlay } from 'react-native-overlay-service'

...
//NOTE: Hooks can only be called at the top level of a function component or a custom hook
const { openOverlay, closeAllOverlay, closeOverlay } = useOverlay()
...
```

### `openOverlay(component: React.ReactNode, type: 'modal' | 'actionsheet', enableCloseWhenPressOutside?: boolean): void`

`component` : The element that you want to display on the overlay

`type` : The type of overlay you want to use `'modal' | 'actionsheet'`

`enableCloseWhenPressOutside` : Decide whether you want the overlay to close when pressed outside

### `closeOverlay(): void`

Close the current overlay

### `closeAllOverlay(): void`

Close all overlays

---

## Example

```
yarn example android
yarn example ios
```
