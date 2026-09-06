"use client";
import React, { useState } from "react";
import styles from "./PopoverPlayground.module.scss";

export default function PopoverPlayground() {
  const [state, setState] = useState({});

  return (
    <div className={styles.playground}>
      <div className={styles.controls}>
        <h3>Controls</h3>
        {/* Mock controls for Popover */}
        <p>Modify component state here.</p>
      </div>
      <div className={styles.preview}>
        <h3>Preview</h3>
        <div className="ss-Popover__preview">
          Mock Popover UI
        </div>
      </div>
    </div>
  );
}