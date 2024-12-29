import { ToastComponent } from '../../component/ToastComponent'
import { ToastComponentTypes, ToastStoreInterface } from '../types/toastTypes'
import { useToastStore } from '../store/useToastStore'
import { LayoutChangeEvent } from 'react-native'

export const ToastRoot = () => {
  const t: ToastComponentTypes[] = useToastStore((state) => state.toasts)
  const setToastHeight: ToastStoreInterface['setToastHeight'] = useToastStore(
    (state) => state.setToastHeight
  )
  const toastHeight: ToastStoreInterface['toastHeight'] = useToastStore(
    (state) => state.toastHeight
  )

  if (!t || t.length === 0) {
    return null
  }

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height: h } = event.nativeEvent.layout

    setToastHeight(Number(h.toFixed(0)))
  }

  return (
    <>
      {t.map((_v: ToastComponentTypes, i: number) => {
        return (
          <ToastComponent
            key={_v.id}
            bottom={(i + 1) * (40 + (toastHeight - 32))}
            v={_v}
            onLayout={handleLayout}
          />
        )
      })}
    </>
  )
}
