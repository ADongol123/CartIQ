"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileText, Upload, X, Check, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function FileUploader() {
  const [files, setFiles] = useState<
    Array<{
      name: string
      size: number
      progress: number
      status: "uploading" | "complete" | "error"
    }>
  >([])

  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).map((file) => ({
        name: file.name,
        size: file.size,
        progress: 0,
        status: "uploading" as const,
      }))

      setFiles((prev) => [...prev, ...newFiles])

      // Simulate upload progress
      newFiles.forEach((file, index) => {
        const timer = setInterval(() => {
          setFiles((prevFiles) => {
            const updatedFiles = [...prevFiles]
            const fileIndex = prevFiles.findIndex((f) => f.name === file.name && f.size === file.size)

            if (fileIndex !== -1) {
              if (updatedFiles[fileIndex].progress < 100) {
                updatedFiles[fileIndex].progress += 10
              } else {
                updatedFiles[fileIndex].status = "complete"
                clearInterval(timer)
              }
            }

            return updatedFiles
          })
        }, 300)
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        name: file.name,
        size: file.size,
        progress: 0,
        status: "uploading" as const,
      }))

      setFiles((prev) => [...prev, ...newFiles])

      // Simulate upload progress
      newFiles.forEach((file) => {
        const timer = setInterval(() => {
          setFiles((prevFiles) => {
            const updatedFiles = [...prevFiles]
            const fileIndex = prevFiles.findIndex((f) => f.name === file.name && f.size === file.size)

            if (fileIndex !== -1) {
              if (updatedFiles[fileIndex].progress < 100) {
                updatedFiles[fileIndex].progress += 10
              } else {
                updatedFiles[fileIndex].status = "complete"
                clearInterval(timer)
              }
            }

            return updatedFiles
          })
        }, 300)
      })
    }
  }

  const removeFile = (fileName: string, fileSize: number) => {
    setFiles((prevFiles) => prevFiles.filter((file) => !(file.name === fileName && file.size === fileSize)))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <Upload className="h-10 w-10 text-muted-foreground" />
          <h3 className="text-lg font-medium">Drag & drop files here</h3>
          <p className="text-sm text-muted-foreground">Support for PDF, TXT, DOCX, CSV, and other text-based files</p>
          <p className="text-xs text-muted-foreground">Maximum file size: 10MB</p>
          <div className="mt-4">
            <label htmlFor="file-upload">
              <Button variant="outline" className="cursor-pointer" onClick={() => {}}>
                Browse Files
              </Button>
              <input id="file-upload" type="file" multiple className="sr-only" onChange={handleFileChange} />
            </label>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium">Uploaded Files</h3>
          <div className="rounded-lg border">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between border-b p-3 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-muted p-2">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{file.name}</span>
                    <span className="text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {file.status === "uploading" && (
                    <div className="flex w-24 items-center gap-2">
                      <Progress value={file.progress} className="h-2 w-16" />
                      <span className="text-xs text-muted-foreground">{file.progress}%</span>
                    </div>
                  )}
                  {file.status === "complete" && (
                    <div className="flex items-center gap-1 text-xs text-emerald-500">
                      <Check className="h-4 w-4" />
                      <span>Complete</span>
                    </div>
                  )}
                  {file.status === "error" && (
                    <div className="flex items-center gap-1 text-xs text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      <span>Error</span>
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => removeFile(file.name, file.size)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button>Process Files</Button>
          </div>
        </div>
      )}
    </div>
  )
}
