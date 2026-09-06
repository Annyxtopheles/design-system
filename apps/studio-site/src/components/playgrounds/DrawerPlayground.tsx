"use client";
import React, { useState } from "react";
import styles from "./DrawerPlayground.module.scss";

export default function DrawerPlayground() {
  const [state, setState] = useState({});

  return (
    <div className={styles.playground}>
      <div className={styles.controls}>
        <h3>Controls</h3>
        {/* Mock controls for Drawer */}
        <p>Modify component state here.</p>
      </div>
      <div className={styles.preview}>
        <h3>Preview</h3>
        <div className="ss-Drawer__preview">
          Mock Drawer UI
        </div>
      </div>
    </div>
  );
}