import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  status: 'uploading' | 'success' | 'error';
  progress?: number;
}

export default function DocumentUpload() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type || 'application/octet-stream',
      status: 'uploading',
      progress: 0,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((file) => {
      simulateUpload(file.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      
      setUploadedFiles((prev) =>
        prev.map((file) =>
          file.id === fileId
            ? { ...file, progress: Math.min(progress, 100) }
            : file
        )
      );

      if (progress >= 100) {
        clearInterval(interval);
        setUploadedFiles((prev) =>
          prev.map((file) =>
            file.id === fileId
              ? { ...file, status: 'success', progress: 100 }
              : file
          )
        );
      }
    }, 200);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('word') || type.includes('document')) return '📝';
    if (type.includes('text')) return '📃';
    return '📄';
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Upload Telecom Standards Documents
        </h1>
        <p className="text-muted-foreground">
          Upload PDF, DOC, or TXT files for AI-powered analysis and version management
        </p>
      </div>

      {/* Upload Zone */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <div
            className={cn(
              'upload-zone p-12 text-center cursor-pointer transition-all duration-200',
              isDragOver && 'dragover'
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 rounded-full bg-primary/10">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Drop files here or click to upload
                </h3>
                <p className="text-sm text-muted-foreground">
                  Support for PDF, DOC, DOCX, and TXT files up to 50MB each
                </p>
              </div>

              <Button
                type="button"
                className="bg-primary hover:bg-primary-hover text-primary-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                Select Files
              </Button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileSelect}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Uploaded Files ({uploadedFiles.length})
            </h3>
            
            <div className="space-y-3">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-4 p-4 rounded-lg border bg-card"
                >
                  <div className="text-2xl">{getFileIcon(file.type)}</div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-foreground truncate">
                        {file.name}
                      </h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(file.id)}
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{file.size}</span>
                      {file.status === 'success' && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1 text-success">
                            <Check className="h-3 w-3" />
                            Uploaded successfully
                          </div>
                        </>
                      )}
                    </div>
                    
                    {file.status === 'uploading' && file.progress !== undefined && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span>Uploading...</span>
                          <span>{Math.round(file.progress)}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-200"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}