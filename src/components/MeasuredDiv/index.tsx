import classNames from "classnames";
import { CSSProperties, ReactNode, useRef, useState, useLayoutEffect } from "react";
import styles from "./styles.module.css";

export function MeasuredDiv(props: {
  style?: CSSProperties;
  measuredStyle?: CSSProperties;
  className?: string;
  measuredClassName?: string;
  children?: (width: number, height: number) => ReactNode;
}) {
  const measuredRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!measuredRef.current) return;
      const { width, height } = measuredRef.current.getBoundingClientRect();
      setWidth(width);
      setHeight(height);
    };
    measure();

    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <>
      <div className={classNames(props.className, styles.measuredDiv)} style={props.style}>
        {props.children?.(width, height) ?? null}
      </div>
      <div
        className={classNames(props.measuredClassName, styles.measuredDivHidden)}
        style={props.measuredStyle}
        ref={measuredRef}
      />
    </>
  );
}
