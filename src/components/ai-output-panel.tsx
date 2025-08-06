import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Download, Copy, Lightbulb, CheckCircle, AlertCircle, Zap, FileType, FileSpreadsheet } from 'lucide-react'
import { EnhancedButton } from '@/components/ui/enhanced-button'
import { cn } from '@/lib/utils'

interface ImprovementTip {
  id: string
  type: 'ux' | 'clarity' | 'ats'
  title: string
  description: string
  severity: 'low' | 'medium' | 'high'
}

const SAMPLE_TIPS: ImprovementTip[] = [
  {
    id: '1',
    type: 'ats',
    title: 'Add more technical keywords',
    description: 'Include specific technologies mentioned in the job description like React, TypeScript, and AWS.',
    severity: 'high'
  },
  {
    id: '2',
    type: 'clarity',
    title: 'Quantify achievements',
    description: 'Add specific metrics to your accomplishments, e.g., "Improved performance by 40%" instead of "Improved performance".',
    severity: 'medium'
  },
  {
    id: '3',
    type: 'ux',
    title: 'Optimize section order',
    description: 'Move your technical skills section higher up since it\'s highly relevant to this role.',
    severity: 'low'
  },
  {
    id: '4',
    type: 'ats',
    title: 'Match job title format',
    description: 'Use "Senior Software Engineer" instead of "Sr. Software Dev" to match the job posting exactly.',
    severity: 'high'
  }
]

interface AIOutputPanelProps {
  className?: string
  isEnhancing?: boolean
  enhancedResume: string // ✅ Added
}

export function AIOutputPanel({ className, isEnhancing = false, enhancedResume }: AIOutputPanelProps) {
  const [activeTab, setActiveTab] = useState<'resume' | 'tips'>('resume')
  const [copied, setCopied] = useState(false)

  const tipIcons = {
    ux: Lightbulb,
    clarity: CheckCircle,
    ats: Zap
  }

  const tipColors = {
    ux: 'border-primary/20 bg-primary/5 text-primary',
    clarity: 'border-secondary/20 bg-secondary/5 text-secondary',
    ats: 'border-accent/20 bg-accent/5 text-accent'
  }

  const severityColors = {
    low: 'bg-blue-500/10 text-blue-600 border-blue-200',
    medium: 'bg-yellow-500/10 text-yellow-600 border-yellow-200',
    high: 'bg-red-500/10 text-red-600 border-red-200'
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(enhancedResume)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <motion.div
      className={cn("glass-card rounded-2xl h-full flex flex-col", className)}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <FileText className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-gradient-primary">AI-Enhanced Output</h2>
          </div>

          {isEnhancing && (
            <motion.div
              className="flex items-center space-x-2 text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium">Enhancing...</span>
            </motion.div>
          )}
        </div>

        <div className="flex space-x-1 bg-muted/30 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('resume')}
            className={cn(
              "flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all",
              activeTab === 'resume'
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <FileText className="w-4 h-4" />
            <span>Enhanced Resume</span>
          </button>
          <button
            onClick={() => setActiveTab('tips')}
            className={cn(
              "flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all",
              activeTab === 'tips'
                ? "bg-secondary text-secondary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Tips ({SAMPLE_TIPS.length})</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'resume' ? (
            <motion.div
              key="resume"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full flex flex-col"
            >
              {/* Action Buttons */}
              <div className="p-4 border-b border-border/30">
                <div className="flex items-center space-x-2">
                  <EnhancedButton
                    variant="glow"
                    size="sm"
                    onClick={copyToClipboard}
                    className="text-xs"
                  >
                    <Copy className="w-3 h-3" />
                    {copied ? 'Copied!' : 'Copy'}
                  </EnhancedButton>

                  <EnhancedButton variant="outline" size="sm" className="text-xs">
                    <FileType className="w-3 h-3" />
                    PDF
                  </EnhancedButton>

                  <EnhancedButton variant="outline" size="sm" className="text-xs">
                    <FileSpreadsheet className="w-3 h-3" />
                    DOCX
                  </EnhancedButton>

                  <EnhancedButton variant="outline" size="sm" className="text-xs">
                    <FileText className="w-3 h-3" />
                    TXT
                  </EnhancedButton>
                </div>
              </div>

              {/* Resume Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {isEnhancing ? (
                  <div className="space-y-4">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="h-4 bg-gradient-to-r from-muted via-primary/20 to-muted rounded animate-shimmer"
                        style={{
                          width: `${Math.random() * 40 + 60}%`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <motion.pre
                    className="text-sm text-foreground leading-relaxed whitespace-pre-wrap font-mono"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {enhancedResume || 'No resume enhanced yet. Paste or upload to begin.'}
                  </motion.pre>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tips"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full overflow-y-auto p-6"
            >
              <div className="space-y-4">
                {SAMPLE_TIPS.map((tip, index) => {
                  const IconComponent = tipIcons[tip.type]

                  return (
                    <motion.div
                      key={tip.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        "p-4 rounded-xl border transition-all hover:shadow-md",
                        tipColors[tip.type]
                      )}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-current/10 flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-4 h-4" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium text-foreground">{tip.title}</h4>
                            <span className={cn(
                              "px-2 py-1 rounded-full text-xs font-medium border",
                              severityColors[tip.severity]
                            )}>
                              {tip.severity}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {tip.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
