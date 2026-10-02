export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  github?: string
  demo?: string
  year: number
}

export type SkillCategory = 'Frontend' | 'Backend' | 'Tools'

export interface Skill {
  name: string
  category: SkillCategory
}

export interface ExperienceItem {
  id: string
  hash: string
  role: string
  company: string
  period: string
  summary: string
  current?: boolean
}

export interface JourneyItem {
  id: string
  period: string
  title: string
  place: string
  description: string
}

export interface Profile {
  name: string
  role: string
  pitch: string
  bio: string
  email: string
  github: string
  linkedin: string
}
