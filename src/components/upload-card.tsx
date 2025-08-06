import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, File, CheckCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UploadCardProps {
  title: string
  subtitle: string
  onFileUpload: (file: File) => void
  accepted?: string[]
  maxSize?: number
  className?: string
}

export function UploadCard({
  title,
  subtitle,
  onFileUpload,
  accepted = ['.pdf', '.doc', '.docx', '.txt'],
  maxSize = 5 * 1024 * 1024, // 5MB
  className
}: UploadCardProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      setIsUploading(true)
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setUploadedFile(file)
      setIsUploading(false)
      onFileUpload(file)
    }
  }, [onFileUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxSize,
    multiple: false
  })

  const removeFile = () => {
    setUploadedFile(null)
  }

  return (
    <motion.div
      className={cn("glass-card rounded-2xl p-6", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <AnimatePresence mode="wait">
        {!uploadedFile ? (
          <motion.div
            key="upload-zone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              'upload-zone p-8 text-center cursor-pointer min-h-[200px] flex flex-col items-center justify-center',
              isDragActive && 'drag-active'
            )}
            {...(getRootProps() as any)}
          >
            <input {...getInputProps()} />
            
            {isUploading ? (
              <motion.div
                className="flex flex-col items-center"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-primary font-medium">Processing...</p>
              </motion.div>
            ) : (
              <>
                <motion.div
                  className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Upload className="w-8 h-8 text-primary" />
                </motion.div>
                
                <h4 className="text-lg font-medium text-foreground mb-2">
                  {isDragActive ? 'Drop your file here' : 'Upload your file'}
                </h4>
                
                <p className="text-sm text-muted-foreground mb-4">
                  Drag & drop or click to browse
                </p>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  {accepted.map((format) => (
                    <span
                      key={format}
                      className="px-2 py-1 bg-muted rounded-lg text-xs text-muted-foreground"
                    >
                      {format.toUpperCase()}
                    </span>
                  ))}
                </div>
                
                <p className="text-xs text-muted-foreground mt-2">
                  Max size: {Math.round(maxSize / (1024 * 1024))}MB
                </p>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="uploaded-file"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="p-6 bg-accent/10 rounded-xl border border-accent/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <File className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <motion.button
                  onClick={removeFile}
                  className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center hover:bg-destructive/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4 text-destructive" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}