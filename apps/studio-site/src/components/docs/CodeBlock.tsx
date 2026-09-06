import React from 'react';
import styles from './CodeBlock.module.scss';

// Mock shiki for this example as we can't easily install and run async server components here in a simple way
// In a real app, this would use shiki to get HTML

export interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
  highlight?: number[];
  showLineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code = '', language, filename, highlight = [], showLineNumbers = false
}) => {
  const lines = (code || '').split('\n');

  return (
    <div className={styles.root}>
      {filename && (
        <div className={styles.header}>
          <span className={styles.filename}>{filename}</span>
        </div>
      )}
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
                  {showLineNumbers && <span className={styles.lineNumber}>{lineNumber}</span>}
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
