import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Brain, Target } from 'lucide-react'
import { UploadCard } from '@/components/upload-card'
import { MonacoEditor } from '@/components/monaco-editor'
import { SkillSelector } from '@/components/skill-selector'
import { JobTitleInput } from '@/components/job-title-input'
import { AIOutputPanel } from '@/components/ai-output-panel'
import { EnhancedButton } from '@/components/ui/enhanced-button'

export function ResumeOptimax() {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [jobDescFile, setJobDescFile] = useState<File | null>(null)
  const [resumeText, setResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [jobTitle, setJobTitle] = useState('')
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [enhancedResume, setEnhancedResume] = useState('') // ✅ New state

const handleResumeUpload = async (file: File) => {
  setResumeFile(file)
  const text = await file.text() // ✅ Real content
  setResumeText(text)
}

const handleJobDescUpload = async (file: File) => {
  setJobDescFile(file)
  const text = await file.text()
  setJobDescription(text)
}

  const handleEnhanceResume = async () => {
    if (!resumeText || !jobDescription) return

    setIsEnhancing(true)
    setEnhancedResume('') // Reset output before new request

    try {
      const res = await fetch('http://localhost:5000/api/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          jobDescription,
          selectedSkills,
          jobTitle
        })
      })

      if (!res.ok) throw new Error('Failed to enhance resume.')

      const data = await res.json()
      setEnhancedResume(data.enhancedResume || '')
    } catch (err) {
      console.error('Error enhancing resume:', err)
      alert('Something went wrong while enhancing your resume.')
    } finally {
      setIsEnhancing(false)
    }
  }

  const canEnhance = resumeText.trim() && jobDescription.trim()
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        className="glass-card rounded-none border-x-0 border-t-0 backdrop-blur-xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Brain className="w-6 h-6 text-primary-foreground" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-gradient-primary">ResumeOptimax</h1>
                <p className="text-muted-foreground">AI-Powered Resume Enhancement</p>
              </div>
            </div>

            <motion.div
              className="hidden md:flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Target className="w-4 h-4" />
                <span>Smart • Fast • ATS-Optimized</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8 h-full">
          {/* Left Panel - Inputs */}
          <div className="space-y-6">
            {/* Upload Cards */}
            <div className="grid md:grid-cols-2 gap-4">
              <UploadCard
                title="Upload Resume"
                subtitle="PDF, DOC, DOCX, or TXT format"
                onFileUpload={handleResumeUpload}
              />
              <UploadCard
                title="Upload Job Description"
                subtitle="Paste or upload the target job posting"
                onFileUpload={handleJobDescUpload}
              />
            </div>

            {/* Monaco Editor */}
            <MonacoEditor
              resumeText={resumeText}
              jobDescription={jobDescription}
              onResumeChange={setResumeText}
              onJobDescriptionChange={setJobDescription}
            />

            {/* Input Controls */}
            <div className="grid md:grid-cols-2 gap-4">
              <JobTitleInput
                value={jobTitle}
                onChange={setJobTitle}
              />
              <SkillSelector
                selectedSkills={selectedSkills}
                onSkillsChange={setSelectedSkills}
              />
            </div>

            {/* Enhance Button */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <EnhancedButton
                variant="enhance"
                size="xl"
                onClick={handleEnhanceResume}
                disabled={!canEnhance || isEnhancing}
                className="w-full md:w-auto animate-float"
              >
                <Sparkles className="w-6 h-6" />
                {isEnhancing ? 'Enhancing Resume...' : '✨ Enhance Resume'}
              </EnhancedButton>
            </motion.div>
          </div>

          {/* Right Panel - AI Output */}
          <div className="lg:h-[calc(100vh-12rem)]">
            <AIOutputPanel
              isEnhancing={isEnhancing}
              enhancedResume={enhancedResume} // ✅ Pass result here
            />
          </div>
        </div>
      </div>

      {/* Mobile Bottom CTA */}
      <motion.div
        className="lg:hidden fixed bottom-0 left-0 right-0 p-4 glass-card border-x-0 border-b-0"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <EnhancedButton
          variant="enhance"
          size="lg"
          onClick={handleEnhanceResume}
          disabled={!canEnhance || isEnhancing}
          className="w-full"
        >
          <Sparkles className="w-5 h-5" />
          {isEnhancing ? 'Enhancing...' : '✨ Enhance Resume'}
        </EnhancedButton>
      </motion.div>
    </div>
  )
}
