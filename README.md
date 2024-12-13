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

       <OverlayRoot />  --> Add this

      </SafeAreaProvider>
  )
}
```

And import `useOverlayStore` to use it

```
import { useOverlayStore } from 'react-native-overlay-service'
```

**1. Open**

```

```
---
