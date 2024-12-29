export interface ToastStoreInterface {
  toasts: ToastComponentTypes[]
  showToast: (
    types: ToastComponentTypes['type'],
    component?: React.ReactNode,
    message?: string,
    option?: OptionToast
  ) => void
  hideToast: () => void
  toastHeight: number
  setToastHeight: (b: number) => void
}

export type OptionToast = {
  usePress?: boolean
  onPress?: (v: ToastComponentTypes) => void
}
export type ToastComponentTypes = {
  id: string
  component?: React.ReactNode
  type: 'warning' | 'error' | 'success' | 'info' | 'noicon'
  message?: string
  option?: OptionToast
}
