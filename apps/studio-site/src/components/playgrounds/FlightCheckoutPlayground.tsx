"use client";
import React, { useState } from "react";
import styles from "./FlightCheckoutPlayground.module.scss";

export default function FlightCheckoutPlayground() {
  const [state, setState] = useState({});

  return (
    <div className={styles.playground}>
      <div className={styles.controls}>
        <h3>Controls</h3>
        {/* Mock controls for FlightCheckout */}
        <p>Modify component state here.</p>
      </div>
      <div className={styles.preview}>
        <h3>Preview</h3>
        <div className="ss-FlightCheckout__preview">
          Mock FlightCheckout UI
        </div>
      </div>
    </div>
  );
}