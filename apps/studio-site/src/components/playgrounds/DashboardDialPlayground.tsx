"use client";
import React, { useState } from "react";
import styles from "./DashboardDialPlayground.module.scss";

export default function DashboardDialPlayground() {
  const [state, setState] = useState({});

  return (
    <div className={styles.playground}>
      <div className={styles.controls}>
        <h3>Controls</h3>
        {/* Mock controls for DashboardDial */}
        <p>Modify component state here.</p>
      </div>
      <div className={styles.preview}>
        <h3>Preview</h3>
        <div className="ss-DashboardDial__preview">
          Mock DashboardDial UI
        </div>
      </div>
    </div>
  );
}