import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Briefcase, TrendingUp, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const POPULAR_JOB_TITLES = [
  'Software Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Data Scientist',
  'Product Manager',
  'UX/UI Designer',
  'DevOps Engineer',
  'Machine Learning Engineer',
  'Software Architect',
  'Technical Lead',
  'Engineering Manager',
  'Data Analyst',
  'Cloud Engineer',
  'Mobile Developer',
  'Security Engineer',
  'Site Reliability Engineer',
  'Quality Assurance Engineer',
  'Database Administrator',
  'Business Analyst'
]

interface JobTitleInputProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function JobTitleInput({ value, onChange, className }: JobTitleInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredTitles = POPULAR_JOB_TITLES.filter(title =>
    title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    setSearchTerm(value)
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setSearchTerm(newValue)
    onChange(newValue)
    setIsOpen(true)
  }

  const selectTitle = (title: string) => {
    setSearchTerm(title)
    onChange(title)
    setIsOpen(false)
    inputRef.current?.blur()
  }

  const clearInput = () => {
    setSearchTerm('')
    onChange('')
    inputRef.current?.focus()
  }

  return (
    <motion.div
      className={cn("glass-card rounded-2xl p-6", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Briefcase className="w-5 h-5 text-secondary" />
          <h3 className="text-lg font-semibold text-foreground">Target Role</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Enter the job title you're applying for
        </p>
      </div>

      <div className="relative">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            <Search className="w-5 h-5" />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 150)}
            placeholder="e.g. Senior Software Engineer"
            className="w-full pl-12 pr-12 py-4 rounded-xl border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all text-lg"
          />
          
          {searchTerm && (
            <motion.button
              onClick={clearInput}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-muted-foreground/20 hover:bg-muted-foreground/30 flex items-center justify-center transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-3 h-3" />
            </motion.button>
          )}
        </div>

        <AnimatePresence>
          {isOpen && filteredTitles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 w-full bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-2">
                <div className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4" />
                  <span>Popular job titles</span>
                </div>
              </div>
              
              <div className="max-h-64 overflow-y-auto">
                {filteredTitles.map((title, index) => (
                  <motion.button
                    key={title}
                    onClick={() => selectTitle(title)}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-secondary/10 transition-colors border-b border-border/30 last:border-b-0"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    whileHover={{ x: 4, backgroundColor: 'hsl(var(--secondary) / 0.1)' }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-secondary" />
                    </div>
                    <div>
                      <span className="font-medium text-foreground">{title}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}