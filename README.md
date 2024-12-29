# react-native-overlay-service

Overlay service using **Zustand** to conveniently open Modal or Actionsheet and Toast

## Installation

```sh
npm install react-native-overlay-service
```

```sh
yarn add react-native-overlay-service
```

## Usage

### 1. Modal or Actionsheet

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

       <OverlayRoot />  <-- Add this to use Overlay
       <ToastRoot />    <-- Add this to use Toast
      </SafeAreaProvider>
  )
}
```

### `useOverlay({ debounce: number }) : UseOverlayReturn`

```
type UseOverlayReturn = {
  openOverlay: (
    component: React.ReactNode, option : { type: "modal" | "actionsheet" , enableCloseWhenPressOutside? : boolean }
  ) => void
  closeOverlay: (type: OverlayComponent['type']) => void
  closeAllOverlay: () => void
}
```

Import `useOverlay` to use it

```
import { useOverlay } from 'react-native-overlay-service'
...
//NOTE: Hooks can only be called at the top level of a function component or a custom hook
const { openOverlay, closeAllOverlay, closeOverlay } = useOverlay({
    debounce: 200
  })
...
```
#### Parameters
`debounce`: Set a "timeout" and only fire the function when the timer expires with no new actions.

---

### `openOverlay(component: React.ReactNode, option : { type: "modal" | "actionsheet" , enableCloseWhenPressOutside? : boolean }): void`

#### Parameters
`component` : The element that you want to display on the overlay

`option`: An object that contains options to configure the overlay:

  - `type`: The type of overlay you want to use. It can be one of the following:
    - "modal": Displays a modal overlay.
    - "actionsheet": Displays an action sheet overlay.
  - `enableCloseWhenPressOutside` (optional): A boolean that determines whether the overlay should close when the user clicks outside of it. If set to true, clicking outside the overlay will close it. If omitted or set to false, clicking outside will not close the overlay.

---

### `closeOverlay( type: "modal" | "actionsheet" ): void`

Close the current overlay

#### Parameters
`type` : The type of overlay you want to close

---

### `closeAllOverlay(): void`

Close all overlays

---

### 2. Toast

### `useToast() : UseToastReturn`

```
type UseToastReturn = {
  showToastWithMessage: (
    types: "warning" | "error" | "success" | "info" | "noicon", 
    message: string, 
    option?: { 
      usePress?: boolean, 
      onPress?: (v: ToastComponentTypes) => void, 
}) => void
}
```

Import `useToast` to use it

```
import { useToast } from 'react-native-overlay-service'
...

//NOTE: Hooks can only be called at the top level of a function component or a custom hook
const { showToastWithMessage } = useToast({
    timeToHide: 2000
  })
...
```
#### Parameters

`timeToHide` (optional) : The Toast time setting will be hidden (ms). Defaut 2000ms

---

### `showToastWithMessage( types: "warning" | "error" | "success" | "info" | "noicon", message: string, option?: { usePress?: boolean, onPress?: (v: ToastComponentTypes) => void })`

#### Type
```
type ToastComponentTypes = {
  id: string
  component?: React.ReactNode
  type: 'warning' | 'error' | 'success' | 'info' | "noicon"
  message?: string
  option?: { usePress?: boolean, onPress?: (v: ToastComponentTypes) => void }
}
```

#### Parameters
`types` : The type of toast you want to use `"warning" | "error" | "success" | "info" | "noicon"`
> `noicon` will show toast without icon and title

`message` : Content you want to display

`option` (optional): Additional customization options for the toast. It is an object with the following properties:

  - `usePress` (optional): A boolean that determines whether you want to receive an event when the user clicks or presses the toast notification. If set to true, the toast will handle a click or press event.
  - `onPress` (optional): A function that will be triggered when the toast is clicked or pressed, if usePress is set to true. This function can receive a parameter of type ToastComponentTypes, which might represent the specific details or data related to the toast.

---

## Example

```
yarn example android
yarn example ios
```
