"use client";

import styles from "./page.module.css";
import { MeasuredDiv } from "@/components/MeasuredDiv";
import { useLayoutEffect, useState } from "react";
import { Measurement } from "@/components/Measurement";

function getPropsForMeasuredDiv(widthValue: string, heightValue: string) {
  return {
    measuredStyle: {
      width: widthValue,
      height: heightValue,
    },
    className: styles.tableRowWrapper,
    children: (width: number, height: number) => (
      <>
        <h2 className={styles.tableRowLabel}>
          Using <strong>{widthValue}</strong> and <strong>{heightValue}</strong>:
        </h2>
        <span className={styles.tableRowInfo}>
          <Measurement>{width}</Measurement>×<Measurement>{height}</Measurement>
        </span>
      </>
    ),
  };
}

export default function Home() {
  const [clientWidth, setClientWidth] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [innerWidth, setInnerWidth] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);
  const [dpr, setDpr] = useState(1);

  useLayoutEffect(() => {
    const measure = () => {
      const { clientWidth, clientHeight } = document.documentElement;
      const { innerWidth, innerHeight } = window;
      setClientWidth(clientWidth);
      setClientHeight(clientHeight);
      setInnerWidth(innerWidth);
      setInnerHeight(innerHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
    };
  });

  useLayoutEffect(() => {
    // set up MQ listener for pixel ratio changes (e.g. when the window is dragged between monitors)
    // see https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio#examples
    // on how to set up the listener
    let mql!: MediaQueryList;

    const setupMql = () => {
      mql = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      mql.addEventListener("change", mqlListener);
    };

    const mqlListener = () => {
      setDpr(window.devicePixelRatio);
    };

    setupMql();

    return () => {
      mql.removeEventListener("change", mqlListener);
    };
  });

  return (
    <>
      <div className={styles.root}>
        <h1 className={styles.header}>Viewport Info (DPR: {dpr})</h1>
        <div className={styles.tableWrapper}>
          <div className={styles.table}>
            <MeasuredDiv {...getPropsForMeasuredDiv("100vw", "100vh")} />
            <MeasuredDiv {...getPropsForMeasuredDiv("100svw", "100svh")} />
            <MeasuredDiv {...getPropsForMeasuredDiv("100dvw", "100dvh")} />
            <MeasuredDiv {...getPropsForMeasuredDiv("100lvw", "100lvh")} />
            <div className={styles.tableRowWrapper}>
              {getPropsForMeasuredDiv("clientWidth", "clientHeight").children(clientWidth, clientHeight)}
            </div>
            <div className={styles.tableRowWrapper}>
              {getPropsForMeasuredDiv("innerWidth", "innerHeight").children(innerWidth, innerHeight)}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.scroller}>This is empty space to simulate a scrolling page</div>
    </>
  );
}
