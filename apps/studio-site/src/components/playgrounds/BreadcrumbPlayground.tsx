"use client";
import React, { useState } from "react";
import styles from "./BreadcrumbPlayground.module.scss";

export default function BreadcrumbPlayground() {
  const [state, setState] = useState({});

  return (
    <div className={styles.playground}>
      <div className={styles.controls}>
        <h3>Controls</h3>
        {/* Mock controls for Breadcrumb */}
        <p>Modify component state here.</p>
      </div>
      <div className={styles.preview}>
        <h3>Preview</h3>
        <div className="ss-Breadcrumb__preview">
          Mock Breadcrumb UI
        </div>
      </div>
    </div>
  );
}