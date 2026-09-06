"use client";
import React, { useState } from "react";
import styles from "./TabsPlayground.module.scss";

export default function TabsPlayground() {
  const [state, setState] = useState({});

  return (
    <div className={styles.playground}>
      <div className={styles.controls}>
        <h3>Controls</h3>
        {/* Mock controls for Tabs */}
        <p>Modify component state here.</p>
      </div>
      <div className={styles.preview}>
        <h3>Preview</h3>
        <div className="ss-Tabs__preview">
          Mock Tabs UI
        </div>
      </div>
    </div>
  );
}