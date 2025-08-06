import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Editor } from '@monaco-editor/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileText, Briefcase, Save } from 'lucide-react'
import { EnhancedButton } from '@/components/ui/enhanced-button'

interface MonacoEditorProps {
  resumeText: string
  jobDescription: string
  onResumeChange: (value: string) => void
  onJobDescriptionChange: (value: string) => void
  className?: string
}

export function MonacoEditor({
  resumeText,
  jobDescription,
  onResumeChange,
  onJobDescriptionChange,
  className
}: MonacoEditorProps) {
  const [activeTab, setActiveTab] = useState('resume')
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Auto-save after 2 seconds of inactivity
  useEffect(() => {
    if (hasUnsavedChanges) {
      const timer = setTimeout(() => {
        setHasUnsavedChanges(false)
        // Here you would typically save to localStorage or send to server
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [hasUnsavedChanges, resumeText, jobDescription])

  const handleResumeChange = (value: string | undefined) => {
    if (value !== undefined) {
      onResumeChange(value)
      setHasUnsavedChanges(true)
    }
  }

  const handleJobDescriptionChange = (value: string | undefined) => {
    if (value !== undefined) {
      onJobDescriptionChange(value)
      setHasUnsavedChanges(true)
    }
  }

  const editorOptions = {
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    wordWrap: 'on' as const,
    lineNumbers: 'off' as const,
    folding: false,
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 0,
    renderLineHighlight: 'none' as const,
    hideCursorInOverviewRuler: true,
    overviewRulerLanes: 0,
    fontSize: 14,
    fontFamily: 'Inter, system-ui, sans-serif',
    theme: 'vs-light',
    padding: { top: 16, bottom: 16 },
    smoothScrolling: true,
    cursorBlinking: 'smooth' as const,
  }

  return (
    <motion.div
      className={`glass-card rounded-2xl overflow-hidden ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Smart Editor</h3>
          <div className="flex items-center space-x-2">
            {hasUnsavedChanges && (
              <motion.div
                className="flex items-center space-x-1 text-warning text-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                <span>Auto-saving...</span>
              </motion.div>
            )}
            <EnhancedButton variant="ghost" size="sm">
              <Save className="w-4 h-4" />
              Save
            </EnhancedButton>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted/30 m-4 mb-0 rounded-xl">
          <TabsTrigger 
            value="resume" 
            className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Resume</span>
          </TabsTrigger>
          <TabsTrigger 
            value="job" 
            className="flex items-center space-x-2 data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground rounded-lg transition-all"
          >
            <Briefcase className="w-4 h-4" />
            <span>Job Description</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="resume" className="mt-0 p-4 pt-2">
          <motion.div
            className="rounded-xl overflow-hidden border border-border/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Editor
              height="400px"
              defaultLanguage="plaintext"
              value={resumeText}
              onChange={handleResumeChange}
              options={editorOptions}
              loading={
                <div className="flex items-center justify-center h-full">
                  <div className="animate-shimmer w-32 h-4 bg-gradient-to-r from-muted via-primary/20 to-muted rounded" />
                </div>
              }
            />
          </motion.div>
        </TabsContent>

        <TabsContent value="job" className="mt-0 p-4 pt-2">
          <motion.div
            className="rounded-xl overflow-hidden border border-border/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Editor
              height="400px"
              defaultLanguage="plaintext"
              value={jobDescription}
              onChange={handleJobDescriptionChange}
              options={editorOptions}
              loading={
                <div className="flex items-center justify-center h-full">
                  <div className="animate-shimmer w-32 h-4 bg-gradient-to-r from-muted via-secondary/20 to-muted rounded" />
                </div>
              }
            />
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}