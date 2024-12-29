import { useToastStore } from '../store/useToastStore'
import { OptionToast, ToastComponentTypes } from '../types/toastTypes'

interface HookProps {
  timeToHide?: number
}

export type UseToastReturn = {
  showToastWithMessage: (
    types: ToastComponentTypes['type'],
    message: string,
    option?: OptionToast
  ) => void
}

export const useToast = (props?: HookProps): UseToastReturn => {
  const { timeToHide = 2000 } = props || {}
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

  const hide = () => {
    setTimeout(() => {
      hideToast()
    }, timeToHide)
  }

  return {
    showToastWithMessage,
  }
}
