"use client";
import React, { useState } from "react";
import styles from "./CommandPalettePlayground.module.scss";

export default function CommandPalettePlayground() {
  const [state, setState] = useState({});

  return (
    <div className={styles.playground}>
      <div className={styles.controls}>
        <h3>Controls</h3>
        {/* Mock controls for CommandPalette */}
        <p>Modify component state here.</p>
      </div>
      <div className={styles.preview}>
        <h3>Preview</h3>
        <div className="ss-CommandPalette__preview">
          Mock CommandPalette UI
        </div>
      </div>
    </div>
  );
}