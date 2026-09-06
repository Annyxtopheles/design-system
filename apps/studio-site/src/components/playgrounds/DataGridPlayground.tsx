"use client";
import React, { useState } from "react";
import styles from "./DataGridPlayground.module.scss";

export default function DataGridPlayground() {
  const [state, setState] = useState({});

  return (
    <div className={styles.playground}>
      <div className={styles.controls}>
        <h3>Controls</h3>
        {/* Mock controls for DataGrid */}
        <p>Modify component state here.</p>
      </div>
      <div className={styles.preview}>
        <h3>Preview</h3>
        <div className="ss-DataGrid__preview">
          Mock DataGrid UI
        </div>
      </div>
    </div>
  );
}