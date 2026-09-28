'use client';

import React, { useState } from 'react';
import styles from './CodeBlock.module.scss';

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  highlight?: number[];
  showLineNumbers?: boolean;
  hideCopyButton?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code = '',
  language = 'tsx',
  filename,
  highlight = [],
  showLineNumbers = false,
  hideCopyButton = false,
}) => {
  const [copied, setCopied] = useState(false);

  const cleanCode = (code || '').trim();
  if (!cleanCode) {
    return null;
  }

  const lines = cleanCode.split('\n');

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(cleanCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={styles.root}>
      {filename ? (
        <div className={styles.header}>
          <span className={styles.filename}>
            <span>📄</span>
            <span>{filename}</span>
          </span>
          {!hideCopyButton && (
            <button
              type="button"
              onClick={handleCopy}
              className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
              aria-label="Copy code to clipboard"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          )}
        </div>
      ) : !hideCopyButton ? (
        <div className={styles.floatingCopyBtn}>
          <button
            type="button"
            onClick={handleCopy}
            className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
            aria-label="Copy code to clipboard"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      ) : null}

      <div className={styles.preContainer}>
        <pre className={styles.pre}>
          <code className={styles.code}>
            {lines.map((line, i) => {
              const lineNumber = i + 1;
              const isHighlighted = highlight.includes(lineNumber);
              return (
                <div
                  key={i}
                  className={`${styles.line} ${isHighlighted ? styles.highlighted : ''}`}
                >
                  {showLineNumbers && (
                    <span className={styles.lineNumber}>{lineNumber}</span>
                  )}
                  <span className={styles.lineContent}>{line || ' '}</span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
