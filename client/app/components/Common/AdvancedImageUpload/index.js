/**
 *
 * AdvancedImageUpload
 *
 */

import React, { useState, useRef, useCallback } from 'react';
import { XIcon } from '../Icon';
import Button from '../Button';
import './style.css';

const AdvancedImageUpload = props => {
  const {
    name,
    label,
    error,
    onInputChange,
    multiple = false,
    maxFiles = 5,
    maxSize = 5 * 1024 * 1024, // 5MB
    accept = 'image/*',
    className = ''
  } = props;

  const [files, setFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  const validateFile = useCallback((file) => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      return 'Please upload only image files';
    }

    // Check file size
    if (file.size > maxSize) {
      return `File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`;
    }

    return null;
  }, [maxSize]);

  const processFiles = useCallback((fileList) => {
    const newFiles = [];
    let errorMessage = '';

    Array.from(fileList).forEach((file, index) => {
      if (!multiple && index > 0) return;
      if (files.length + newFiles.length >= maxFiles) {
        errorMessage = `Maximum ${maxFiles} files allowed`;
        return;
      }

      const validationError = validateFile(file);
      if (validationError) {
        errorMessage = validationError;
        return;
      }

      const fileWithPreview = {
        file,
        id: Date.now() + index,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: file.size
      };

      newFiles.push(fileWithPreview);
    });

    if (errorMessage) {
      setUploadError(errorMessage);
      setTimeout(() => setUploadError(''), 3000);
      return;
    }

    setUploadError('');
    const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
    setFiles(updatedFiles);
    
    // Pass files to parent component
    const fileObjects = updatedFiles.map(f => f.file);
    onInputChange(name, multiple ? fileObjects : fileObjects[0]);
  }, [files, multiple, maxFiles, validateFile, name, onInputChange]);

  const handleFileSelect = useCallback((e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      processFiles(selectedFiles);
    }
  }, [processFiles]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      processFiles(droppedFiles);
    }
  }, [processFiles]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const removeFile = useCallback((fileId) => {
    const updatedFiles = files.filter(f => f.id !== fileId);
    setFiles(updatedFiles);
    
    // Clean up object URL
    const fileToRemove = files.find(f => f.id === fileId);
    if (fileToRemove) {
      URL.revokeObjectURL(fileToRemove.preview);
    }

    // Update parent component
    const fileObjects = updatedFiles.map(f => f.file);
    onInputChange(name, multiple ? fileObjects : (fileObjects[0] || null));
  }, [files, name, onInputChange, multiple]);

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`advanced-image-upload ${className}`}>
      {label && <label className="upload-label">{label}</label>}
      }
      
      <div
        className={`upload-area ${isDragOver ? 'drag-over' : ''} ${files.length > 0 ? 'has-files' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="file-input"
        />

        {files.length === 0 ? (
          <div className="upload-placeholder">
            <div className="upload-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="upload-text">
              <p className="upload-title">
                {isDragOver ? 'Drop images here' : 'Click to upload or drag and drop'}
              </p>
              <p className="upload-subtitle">
                {multiple ? `PNG, JPG, GIF up to ${Math.round(maxSize / (1024 * 1024))}MB (max ${maxFiles} files)` : `PNG, JPG, GIF up to ${Math.round(maxSize / (1024 * 1024))}MB`}
              </p>
            </div>
          </div>
        ) : (
          <div className="files-preview">
            {files.map((file) => (
              <div key={file.id} className="file-preview">
                <div className="image-container">
                  <img src={file.preview} alt={file.name} className="preview-image" />
                  <button
                    type="button"
                    className="remove-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file.id);
                    }}
                  >
                    <XIcon width={16} height={16} />
                  </button>
                </div>
                <div className="file-info">
                  <p className="file-name">{file.name}</p>
                  <p className="file-size">{formatFileSize(file.size)}</p>
                </div>
              </div>
            ))}
            
            {multiple && files.length < maxFiles && (
              <div className="add-more-button" onClick={openFileDialog}>
                <div className="add-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Add More</span>
              </div>
            )}
          </div>
        )}
      </div>

      {(error || uploadError) && (
        <span className="error-message">
          {uploadError || (error && error[0])}
        </span>
      )}

      {files.length > 0 && (
        <div className="upload-actions">
          <Button
            variant="secondary"
            size="sm"
            text="Clear All"
            onClick={() => {
              files.forEach(file => URL.revokeObjectURL(file.preview));
              setFiles([]);
              onInputChange(name, multiple ? [] : null);
            }}
          />
          <span className="file-count">
            {files.length} {files.length === 1 ? 'file' : 'files'} selected
          </span>
        </div>
      )}
    </div>
  );
};

export default AdvancedImageUpload;