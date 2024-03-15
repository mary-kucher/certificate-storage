import React, { useRef } from 'react';
import styles from './styles/CertificateLoadWindow.module.scss';

type Props = {
  onFileSelect: (file: File) => void;
}

export const CertificateLoadWindow: React.FC<Props> = ({onFileSelect}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };
  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={styles.fileUploader}
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
      onDragLeave={e => e.preventDefault()}
    >
      <input
        type="file"
        ref={fileInputRef}
        className={styles.input}
        onChange={handleFileInputChange}
      />
      <div className={styles.content}>
        <span>Перетягніть файл сертифікату сюди або</span>
        <button type="button" onClick={openFileDialog}>Виберіть через стандартний діалог</button>
      </div>
    </div>
  );
};
