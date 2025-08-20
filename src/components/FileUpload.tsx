import React, { useState, useRef } from 'react';
import { Upload, X, File, Image, FileText, Database, Code } from 'lucide-react';

interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
  content?: string;
  type: 'text' | 'image' | 'other';
}

interface FileUploadProps {
  allowedFileTypes: string[];
  onFilesChange: (files: UploadedFile[]) => void;
  maxFiles?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  allowedFileTypes, 
  onFilesChange, 
  maxFiles = 5 
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (fileName: string) => {
    const extension = fileName.toLowerCase().split('.').pop();
    
    if (['.png', '.jpg', '.jpeg', '.gif', '.webp'].some(ext => fileName.toLowerCase().endsWith(ext))) {
      return <Image className="h-5 w-5 text-purple-500" />;
    }
    if (['.py', '.js', '.ts', '.java', '.cpp', '.json'].some(ext => fileName.toLowerCase().endsWith(ext))) {
      return <Code className="h-5 w-5 text-blue-500" />;
    }
    if (['.csv', '.sql'].some(ext => fileName.toLowerCase().endsWith(ext))) {
      return <Database className="h-5 w-5 text-green-500" />;
    }
    return <FileText className="h-5 w-5 text-gray-500" />;
  };

  const isValidFileType = (fileName: string): boolean => {
    return allowedFileTypes.some(type => fileName.toLowerCase().endsWith(type.toLowerCase()));
  };

  const getFileType = (file: File): 'text' | 'image' | 'other' => {
    const extension = file.name.toLowerCase().split('.').pop();
    
    if (['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(`.${extension}`)) {
      return 'image';
    }
    if (['.txt', '.md', '.py', '.js', '.ts', '.java', '.cpp', '.json', '.csv', '.sql', '.docx', '.pdf'].includes(`.${extension}`)) {
      return 'text';
    }
    return 'other';
  };

  const processFile = async (file: File): Promise<UploadedFile> => {
    const fileType = getFileType(file);
    const uploadedFile: UploadedFile = {
      id: Math.random().toString(36).substr(2, 9),
      file,
      type: fileType
    };

    // Create preview for images
    if (fileType === 'image') {
      uploadedFile.preview = URL.createObjectURL(file);
    }

    // Extract text content for text files
    if (fileType === 'text') {
      try {
        const text = await file.text();
        uploadedFile.content = text;
      } catch (error) {
        console.error('Error reading file content:', error);
      }
    }

    return uploadedFile;
  };

  const handleFiles = async (files: FileList) => {
    const validFiles = Array.from(files).filter(file => {
      if (!isValidFileType(file.name)) {
        alert(`File type not allowed: ${file.name}`);
        return false;
      }
      return true;
    });

    if (uploadedFiles.length + validFiles.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const processedFiles = await Promise.all(validFiles.map(processFile));
    const newFiles = [...uploadedFiles, ...processedFiles];
    
    setUploadedFiles(newFiles);
    onFilesChange(newFiles);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (fileId: string) => {
    const newFiles = uploadedFiles.filter(f => f.id !== fileId);
    setUploadedFiles(newFiles);
    onFilesChange(newFiles);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
          dragActive
            ? 'border-purple-500 bg-purple-50'
            : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={allowedFileTypes.join(',')}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-2">
          <Upload className="h-8 w-8 text-gray-400 mx-auto" />
          <div>
            <p className="text-sm font-medium text-gray-900">
              Drop files here or click to upload
            </p>
            <p className="text-xs text-gray-500">
              Supported formats: {allowedFileTypes.join(', ')}
            </p>
            <p className="text-xs text-gray-500">
              Maximum {maxFiles} files
            </p>
          </div>
        </div>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Uploaded Files</h4>
          <div className="space-y-2">
            {uploadedFiles.map((uploadedFile) => (
              <div
                key={uploadedFile.id}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border"
              >
                {/* File Icon/Preview */}
                <div className="flex-shrink-0">
                  {uploadedFile.type === 'image' && uploadedFile.preview ? (
                    <img
                      src={uploadedFile.preview}
                      alt={uploadedFile.file.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    getFileIcon(uploadedFile.file.name)
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {uploadedFile.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(uploadedFile.file.size)}
                    {uploadedFile.content && (
                      <span className="ml-2 text-green-600">
                        • Content extracted
                      </span>
                    )}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFile(uploadedFile.id)}
                  className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;