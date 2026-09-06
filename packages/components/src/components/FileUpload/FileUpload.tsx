import React, { useState, useCallback, useEffect } from 'react';
import './FileUpload.scss';

export interface FileUploadProps {
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  multiple?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ accept, maxSize, maxFiles = 10, multiple = true }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState<Record<string, number>>({});

  const processFiles = (newFiles: File[]) => {
    let validFiles = newFiles.slice(0, maxFiles - files.length);
    if (maxSize) validFiles = validFiles.filter(f => f.size <= maxSize);
    
    setFiles(prev => [...prev, ...validFiles]);

    validFiles.forEach(f => {
      if (f.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setPreviews(p => ({...p, [f.name]: e.target!.result as string}));
          }
        };
        reader.readAsDataURL(f);
      }
      
      let prog = 0;
      const interval = setInterval(() => {
        prog += 10;
        setProgress(p => ({...p, [f.name]: Math.min(prog, 100)}));
        if (prog >= 100) clearInterval(interval);
      }, 200);
    });
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    processFiles(Array.from(e.dataTransfer.files));
  }, [files]);

  return (
    <div className="ds-FileUpload-container">
      <div className="ds-FileUpload__zone" onDragOver={e => e.preventDefault()} onDrop={onDrop}>
        <p>Drag and drop files here or click to browse.</p>
        <input type="file" multiple={multiple} accept={accept} onChange={e => {
          if (e.target.files) processFiles(Array.from(e.target.files));
        }} hidden id="file-upload-input" />
        <label htmlFor="file-upload-input" className="ds-FileUpload__button">Browse Files</label>
      </div>
      <div className="ds-FileUpload__list">
        {files.map(f => (
          <div key={f.name} className="ds-FileUpload__item">
            {previews[f.name] && <img src={previews[f.name]} alt="preview" width={40} height={40} />}
            <div className="ds-FileUpload__item-info">
              <span>{f.name}</span>
              <progress value={progress[f.name] || 0} max="100" />
            </div>
            <button onClick={() => setFiles(files.filter(x => x !== f))}>&times;</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FileUpload;
