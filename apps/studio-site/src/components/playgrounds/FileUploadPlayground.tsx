"use client";
import React, { useState } from "react";
import styles from "./FileUploadPlayground.module.scss";

export default function FileUploadPlayground() {
  const [state, setState] = useState({});

  return (
    <div className={styles.playground}>
      <div className={styles.controls}>
        <h3>Controls</h3>
        {/* Mock controls for FileUpload */}
        <p>Modify component state here.</p>
      </div>
      <div className={styles.preview}>
        <h3>Preview</h3>
        <div className="ss-FileUpload__preview">
          Mock FileUpload UI
        </div>
      </div>
    </div>
  );
}