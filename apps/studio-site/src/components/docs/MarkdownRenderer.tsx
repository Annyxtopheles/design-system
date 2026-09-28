import React from 'react';
import styles from './MarkdownRenderer.module.scss';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  if (!content) return null;

  // Simple, robust parser for documentation markdown
  const lines = content.trim().split('\n');
  const elements: React.ReactNode[] = [];

  let inList = false;
  let listItems: React.ReactNode[] = [];
  let keyCounter = 0;

  const flushList = () => {
    if (inList && listItems.length > 0) {
      elements.push(
        <ul key={`list-${keyCounter++}`} className={styles.list}>
          {listItems}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  const renderInline = (text: string): React.ReactNode => {
    // Process inline bold, code, links
    const parts: React.ReactNode[] = [];
    const regex = /(\*\*.*?\*\*|`.*?`)/g;
    let lastIdx = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIdx) {
        parts.push(text.substring(lastIdx, match.index));
      }
      const raw = match[0];
      if (raw.startsWith('**') && raw.endsWith('**')) {
        parts.push(<strong key={`b-${keyCounter++}`}>{raw.slice(2, -2)}</strong>);
      } else if (raw.startsWith('`') && raw.endsWith('`')) {
        parts.push(<code key={`c-${keyCounter++}`} className={styles.inlineCode}>{raw.slice(1, -1)}</code>);
      }
      lastIdx = regex.lastIndex;
    }
    if (lastIdx < text.length) {
      parts.push(text.substring(lastIdx));
    }
    return parts.length > 0 ? parts : text;
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      flushList();
      continue;
    }

    if (line.startsWith('#### ')) {
      flushList();
      elements.push(<h4 key={`h4-${i}`} className={styles.h4}>{renderInline(line.slice(5))}</h4>);
    } else if (line.startsWith('### ')) {
      flushList();
      elements.push(<h3 key={`h3-${i}`} className={styles.h3}>{renderInline(line.slice(4))}</h3>);
    } else if (line.startsWith('## ')) {
      flushList();
      elements.push(<h2 key={`h2-${i}`} className={styles.h2}>{renderInline(line.slice(3))}</h2>);
    } else if (line.startsWith('# ')) {
      flushList();
      elements.push(<h1 key={`h1-${i}`} className={styles.h1}>{renderInline(line.slice(2))}</h1>);
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      inList = true;
      listItems.push(<li key={`li-${i}`} className={styles.listItem}>{renderInline(line.slice(2))}</li>);
    } else if (/^\d+\.\s/.test(line)) {
      flushList();
      const content = line.replace(/^\d+\.\s/, '');
      elements.push(
        <div key={`ol-item-${i}`} className={styles.numberedItem}>
          <span className={styles.numberBadge}>{line.match(/^\d+/)![0]}.</span>
          <span>{renderInline(content)}</span>
        </div>
      );
    } else {
      flushList();
      elements.push(<p key={`p-${i}`} className={styles.p}>{renderInline(line)}</p>);
    }
  }

  flushList();

  return <div className={`${styles.markdownContainer} ${className}`}>{elements}</div>;
};

export default MarkdownRenderer;
