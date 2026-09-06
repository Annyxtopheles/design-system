"use client";
import React, { useState } from "react";
import styles from "./SidebarNavPlayground.module.scss";

export default function SidebarNavPlayground() {
  const [state, setState] = useState({});

  return (
    <div className={styles.playground}>
      <div className={styles.controls}>
        <h3>Controls</h3>
        {/* Mock controls for SidebarNav */}
        <p>Modify component state here.</p>
      </div>
      <div className={styles.preview}>
        <h3>Preview</h3>
        <div className="ss-SidebarNav__preview">
          Mock SidebarNav UI
        </div>
      </div>
    </div>
  );
}