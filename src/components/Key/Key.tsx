import { FunctionComponent } from "react"
import clsx from "clsx"
import { NoteType } from "../../domain/notes"
import styles from "./Key.module.css"
import { usePressObserver } from "../PressObserver/usePressObserver"

type PressCallback = () => void
type KeyProps = {
  type: NoteType
  label: string
  disabled?: boolean

  onUp: PressCallback
  onDown: PressCallback
}

export const Key: FunctionComponent<KeyProps> = ({
  type,
  label,
  onDown,
  onUp,
  ...rest
}) => {
  const pressed = usePressObserver({
    watchKey: label,
    onStartPress: onDown,
    onFinishPress: onUp
  })

  return (
    <button
      className={clsx(styles.key, styles[type], pressed && "is-pressed")}
      onMouseDown={onDown}
      onMouseUp={onUp}
      type="button"
      {...rest}
    >
      {label}
    </button>
  )
}
