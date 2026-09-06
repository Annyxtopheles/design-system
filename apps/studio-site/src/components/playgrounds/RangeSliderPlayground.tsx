"use client";
import React, { useState } from "react";
import styles from "./RangeSliderPlayground.module.scss";

export default function RangeSliderPlayground() {
  const [state, setState] = useState({});

  return (
    <div className={styles.playground}>
      <div className={styles.controls}>
        <h3>Controls</h3>
        {/* Mock controls for RangeSlider */}
        <p>Modify component state here.</p>
      </div>
      <div className={styles.preview}>
        <h3>Preview</h3>
        <div className="ss-RangeSlider__preview">
          Mock RangeSlider UI
        </div>
      </div>
    </div>
  );
}