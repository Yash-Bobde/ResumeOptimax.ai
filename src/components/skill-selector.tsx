import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Skill {
  id: string
  name: string
  category: 'technical' | 'soft' | 'industry'
}

const PREDEFINED_SKILLS: Skill[] = [
  // Technical Skills
  { id: '1', name: 'React', category: 'technical' },
  { id: '2', name: 'TypeScript', category: 'technical' },
  { id: '3', name: 'Node.js', category: 'technical' },
  { id: '4', name: 'Python', category: 'technical' },
  { id: '5', name: 'Java', category: 'technical' },
  { id: '6', name: 'AWS', category: 'technical' },
  { id: '7', name: 'Docker', category: 'technical' },
  { id: '8', name: 'Kubernetes', category: 'technical' },
  
  // Soft Skills
  { id: '9', name: 'Leadership', category: 'soft' },
  { id: '10', name: 'Communication', category: 'soft' },
  { id: '11', name: 'Problem Solving', category: 'soft' },
  { id: '12', name: 'Teamwork', category: 'soft' },
  { id: '13', name: 'Project Management', category: 'soft' },
  { id: '14', name: 'Critical Thinking', category: 'soft' },
  
  // Industry Skills
  { id: '15', name: 'Agile/Scrum', category: 'industry' },
  { id: '16', name: 'DevOps', category: 'industry' },
  { id: '17', name: 'Machine Learning', category: 'industry' },
  { id: '18', name: 'Data Analysis', category: 'industry' },
  { id: '19', name: 'UI/UX Design', category: 'industry' },
  { id: '20', name: 'Cybersecurity', category: 'industry' }
]

interface SkillSelectorProps {
  selectedSkills: string[]
  onSkillsChange: (skills: string[]) => void
  className?: string
}

export function SkillSelector({ selectedSkills, onSkillsChange, className }: SkillSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [customSkill, setCustomSkill] = useState('')

  const categoryColors = {
    technical: 'bg-primary/10 text-primary border-primary/20',
    soft: 'bg-secondary/10 text-secondary border-secondary/20',
    industry: 'bg-accent/10 text-accent border-accent/20'
  }

  const filteredSkills = PREDEFINED_SKILLS.filter(skill =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedSkills.includes(skill.name)
  )

  const addSkill = (skillName: string) => {
    if (!selectedSkills.includes(skillName)) {
      onSkillsChange([...selectedSkills, skillName])
    }
  }

  const removeSkill = (skillName: string) => {
    onSkillsChange(selectedSkills.filter(skill => skill !== skillName))
  }

  const addCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      addSkill(customSkill.trim())
      setCustomSkill('')
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return '⚡'
      case 'soft': return '🤝'
      case 'industry': return '🏢'
      default: return '💡'
    }
  }

  return (
    <motion.div
      className={cn("glass-card rounded-2xl p-6", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Skill Emphasis</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Select skills to highlight in your optimized resume
        </p>
      </div>

      {/* Selected Skills */}
      {selectedSkills.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {selectedSkills.map((skill) => {
                const skillData = PREDEFINED_SKILLS.find(s => s.name === skill)
                const category = skillData?.category || 'industry'
                
                return (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-xl border text-sm font-medium",
                      categoryColors[category]
                    )}
                  >
                    <span>{getCategoryIcon(category)}</span>
                    <span>{skill}</span>
                    <motion.button
                      onClick={() => removeSkill(skill)}
                      className="w-4 h-4 rounded-full bg-current/20 flex items-center justify-center hover:bg-current/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-2.5 h-2.5" />
                    </motion.button>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Add Skills Interface */}
      <div className="space-y-4">
        {/* Search and Add Custom */}
        <div className="flex space-x-2">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search skills or add custom..."
              value={searchTerm || customSkill}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCustomSkill(e.target.value)
              }}
              onFocus={() => setIsOpen(true)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          {customSkill && (
            <motion.button
              onClick={addCustomSkill}
              className="px-4 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </motion.button>
          )}
        </div>

        {/* Skill Suggestions */}
        <AnimatePresence>
          {(isOpen || searchTerm) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border border-border rounded-xl bg-background/80 backdrop-blur-sm overflow-hidden"
            >
              <div className="max-h-48 overflow-y-auto p-2 space-y-1">
                {filteredSkills.length > 0 ? (
                  filteredSkills.map((skill) => (
                    <motion.button
                      key={skill.id}
                      onClick={() => {
                        addSkill(skill.name)
                        setSearchTerm('')
                        setCustomSkill('')
                      }}
                      className={cn(
                        "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left hover:bg-muted/50 transition-colors",
                        categoryColors[skill.category].replace('bg-', 'hover:bg-')
                      )}
                      whileHover={{ x: 4 }}
                    >
                      <span className="text-lg">{getCategoryIcon(skill.category)}</span>
                      <div>
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-xs text-muted-foreground ml-2 capitalize">
                          {skill.category}
                        </span>
                      </div>
                    </motion.button>
                  ))
                ) : (
                  <div className="px-3 py-6 text-center text-muted-foreground">
                    <span>No skills found. Add a custom skill above!</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}