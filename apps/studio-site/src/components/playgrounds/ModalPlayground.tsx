"use client";
import React, { useState } from "react";
import styles from "./ModalPlayground.module.scss";

export default function ModalPlayground() {
  const [state, setState] = useState({});

  return (
    <div className={styles.playground}>
      <div className={styles.controls}>
        <h3>Controls</h3>
        {/* Mock controls for Modal */}
        <p>Modify component state here.</p>
      </div>
      <div className={styles.preview}>
        <h3>Preview</h3>
        <div className="ss-Modal__preview">
          Mock Modal UI
        </div>
      </div>
    </div>
  );
}