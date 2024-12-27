import { useToastStore } from '../store/useToastStore'
import { OptionToast, ToastComponentTypes } from '../types/toastTypes'

interface HookProps {
  timeToHide?: number
}

export const useToast = (props?: HookProps) => {
  const { timeToHide } = props || {}
  const showToast = useToastStore((state) => state.showToast)
  const hideToast = useToastStore((state) => state.hideToast)

  const showToastWithMessage = (
    types: ToastComponentTypes['type'],
    message: string,
    option?: OptionToast
  ) => {
    showToast(types, undefined, message, option)
    hide()
  }

  const showToastWithComponent = (
    types: ToastComponentTypes['type'],
    component: React.ReactNode
  ) => {
    showToast(types, component)
    hide()
  }

  const hide = () => {
    setTimeout(() => {
      hideToast()
    }, timeToHide)
  }

  return {
    hideToast,
    showToastWithMessage,
    showToastWithComponent,
  }
}
