"use client";
import React, { useState } from "react";
import styles from "./PaginationPlayground.module.scss";

export default function PaginationPlayground() {
  const [state, setState] = useState({});

  return (
    <div className={styles.playground}>
      <div className={styles.controls}>
        <h3>Controls</h3>
        {/* Mock controls for Pagination */}
        <p>Modify component state here.</p>
      </div>
      <div className={styles.preview}>
        <h3>Preview</h3>
        <div className="ss-Pagination__preview">
          Mock Pagination UI
        </div>
      </div>
    </div>
  );
}