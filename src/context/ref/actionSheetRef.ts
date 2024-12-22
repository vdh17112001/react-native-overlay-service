import { createRef } from 'react'
export interface ActionSheetRef {
  close: () => void
}
const actionSheetRef = createRef<ActionSheetRef>()

export default actionSheetRef
