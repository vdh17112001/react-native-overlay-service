import { createRef } from 'react'
export interface ActionSheetRef {
  close: () => void
}
const modalRef = createRef<ActionSheetRef>()

export default modalRef
