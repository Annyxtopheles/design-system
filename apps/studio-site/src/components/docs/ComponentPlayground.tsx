'use client';

import React, { useState } from 'react';
import styles from './ComponentPlayground.module.scss';

interface ComponentPlaygroundProps {
  children?: React.ReactNode;
}

type BackgroundTheme = 'white' | 'gray' | 'dark' | 'transparent';
type ViewportSize = 'desktop' | 'tablet' | 'mobile';
type ZoomLevel = 50 | 75 | 100 | 125;

export function ComponentPlayground({ children }: ComponentPlaygroundProps) {
  const [background, setBackground] = useState<BackgroundTheme>('white');
  const [viewport, setViewport] = useState<ViewportSize>('desktop');
  const [zoom, setZoom] = useState<ZoomLevel>(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const getViewportWidth = () => {
    switch (viewport) {
      case 'mobile': return '320px';
      case 'tablet': return '768px';
      case 'desktop': return '100%';
    }
  };

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  return (
    <div className={`${styles.playgroundContainer} ${isFullscreen ? styles.fullscreen : ''}`}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarGroup}>
          <button className={styles.toolbarBtn} onClick={() => setBackground('white')}>White</button>
          <button className={styles.toolbarBtn} onClick={() => setBackground('gray')}>Gray</button>
          <button className={styles.toolbarBtn} onClick={() => setBackground('dark')}>Dark</button>
          <button className={styles.toolbarBtn} onClick={() => setBackground('transparent')}>Trans</button>
        </div>
        
        <div className={styles.toolbarGroup}>
          <button className={styles.toolbarBtn} onClick={() => setViewport('mobile')}>Mobile</button>
          <button className={styles.toolbarBtn} onClick={() => setViewport('tablet')}>Tablet</button>
          <button className={styles.toolbarBtn} onClick={() => setViewport('desktop')}>Desktop</button>
        </div>

        <div className={styles.toolbarGroup}>
          <select 
            value={zoom} 
            onChange={(e) => setZoom(Number(e.target.value) as ZoomLevel)}
            className={styles.zoomSelect}
          >
            <option value={50}>50%</option>
            <option value={75}>75%</option>
            <option value={100}>100%</option>
            <option value={125}>125%</option>
          </select>
        </div>

        <button className={styles.fullscreenBtn} onClick={toggleFullscreen}>
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>

      <div className={styles.previewWrapper}>
        <div 
          className={`${styles.previewArea} ${styles[`bg-${background}`]}`}
          style={{ 
            width: getViewportWidth(),
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center'
          }}
        >
          {children || <div className={styles.empty}>Playground Empty</div>}
        </div>
      </div>
    </div>
  );
}
