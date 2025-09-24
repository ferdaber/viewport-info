import { ComponentProps } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

export function Measurement(props: ComponentProps<"button">) {
  const num = Number.parseInt(String(props.children));
  return (
    <button
      {...props}
      className={classNames(props.className, styles.measurement)}
      onClick={(ev) => {
        props.onClick?.(ev);
        navigator.clipboard.writeText(String(props.children));
      }}
    >
      <code>{!Number.isNaN(num) ? Math.floor(num) : props.children}</code>
      <span>px</span>
    </button>
  );
}
