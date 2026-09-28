import React, { useState, useCallback } from 'react';
import './FileUpload.scss';

export interface FileUploadProps {
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  multiple?: boolean;
  disabled?: boolean;
  onFilesChange?: (files: File[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  maxSize,
  maxFiles = 10,
  multiple = true,
  disabled = false,
  onFilesChange,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [isDragOver, setIsDragOver] = useState(false);

  const processFiles = (newFiles: File[]) => {
    if (disabled) return;
    let validFiles = newFiles.slice(0, maxFiles - files.length);
    if (maxSize) validFiles = validFiles.filter((f) => f.size <= maxSize);

    const updated = [...files, ...validFiles];
    setFiles(updated);
    onFilesChange?.(updated);

    validFiles.forEach((f) => {
      if (f.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setPreviews((p) => ({ ...p, [f.name]: e.target!.result as string }));
          }
        };
        reader.readAsDataURL(f);
      }

      let prog = 0;
      const interval = setInterval(() => {
        prog += 20;
        setProgress((p) => ({ ...p, [f.name]: Math.min(prog, 100) }));
        if (prog >= 100) clearInterval(interval);
      }, 100);
    });
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const onDragLeave = () => {
    setIsDragOver(false);
  };

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (!disabled) {
        processFiles(Array.from(e.dataTransfer.files));
      }
    },
    [files, disabled]
  );

  const removeFile = (fileToRemove: File) => {
    const updated = files.filter((f) => f !== fileToRemove);
    setFiles(updated);
    onFilesChange?.(updated);
  };

  return (
    <div className={`ds-FileUpload ${disabled ? 'ds-FileUpload--disabled' : ''}`}>
      <div
        className={`ds-FileUpload__zone ${isDragOver ? 'ds-FileUpload__zone--active' : ''}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="ds-FileUpload__icon" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <p className="ds-FileUpload__prompt">
          <strong>Click to upload</strong> or drag and drop files here
        </p>
        <span className="ds-FileUpload__limits">
          {accept ? `Accepted: ${accept}` : 'All formats supported'} {maxSize ? `(up to ${(maxSize / 1024 / 1024).toFixed(0)}MB)` : ''}
        </span>

        <input
          type="file"
          multiple={multiple}
          accept={accept}
          disabled={disabled}
          onChange={(e) => {
            if (e.target.files) processFiles(Array.from(e.target.files));
          }}
          className="ds-FileUpload__input"
          id="ds-file-upload-input"
        />
        <label htmlFor="ds-file-upload-input" className="ds-FileUpload__browse-btn">
          Browse Files
        </label>
      </div>

      {files.length > 0 && (
        <div className="ds-FileUpload__list">
          {files.map((f) => (
            <div key={f.name} className="ds-FileUpload__item">
              {previews[f.name] ? (
                <img src={previews[f.name]} alt="preview" className="ds-FileUpload__item-preview" />
              ) : (
                <div className="ds-FileUpload__item-fallback-icon">📄</div>
              )}
              <div className="ds-FileUpload__item-info">
                <div className="ds-FileUpload__item-header">
                  <span className="ds-FileUpload__item-name">{f.name}</span>
                  <span className="ds-FileUpload__item-size">{(f.size / 1024).toFixed(1)} KB</span>
                </div>
                <div className="ds-FileUpload__progress-track">
                  <div
                    className="ds-FileUpload__progress-fill"
                    style={{ width: `${progress[f.name] || 0}%` }}
                  />
                </div>
              </div>
              <button
                type="button"
                className="ds-FileUpload__remove-btn"
                onClick={() => removeFile(f)}
                aria-label={`Remove file ${f.name}`}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
