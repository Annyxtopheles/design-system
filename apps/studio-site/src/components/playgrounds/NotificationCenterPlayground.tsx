"use client";
import React, { useState } from "react";
import styles from "./NotificationCenterPlayground.module.scss";

export default function NotificationCenterPlayground() {
  const [state, setState] = useState({});

  return (
    <div className={styles.playground}>
      <div className={styles.controls}>
        <h3>Controls</h3>
        {/* Mock controls for NotificationCenter */}
        <p>Modify component state here.</p>
      </div>
      <div className={styles.preview}>
        <h3>Preview</h3>
        <div className="ss-NotificationCenter__preview">
          Mock NotificationCenter UI
        </div>
      </div>
    </div>
  );
}