"use client";
import React, { useState } from "react";
import styles from "./StepperPlayground.module.scss";

export default function StepperPlayground() {
  const [state, setState] = useState({});

  return (
    <div className={styles.playground}>
      <div className={styles.controls}>
        <h3>Controls</h3>
        {/* Mock controls for Stepper */}
        <p>Modify component state here.</p>
      </div>
      <div className={styles.preview}>
        <h3>Preview</h3>
        <div className="ss-Stepper__preview">
          Mock Stepper UI
        </div>
      </div>
    </div>
  );
}