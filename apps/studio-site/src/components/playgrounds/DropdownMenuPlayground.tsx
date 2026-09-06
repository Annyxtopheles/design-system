"use client";
import React, { useState } from "react";
import styles from "./DropdownMenuPlayground.module.scss";

export default function DropdownMenuPlayground() {
  const [state, setState] = useState({});

  return (
    <div className={styles.playground}>
      <div className={styles.controls}>
        <h3>Controls</h3>
        {/* Mock controls for DropdownMenu */}
        <p>Modify component state here.</p>
      </div>
      <div className={styles.preview}>
        <h3>Preview</h3>
        <div className="ss-DropdownMenu__preview">
          Mock DropdownMenu UI
        </div>
      </div>
    </div>
  );
}