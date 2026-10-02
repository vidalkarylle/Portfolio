import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'project-1',
    title: '[Project 1]',
    description:
      '[One or two sentences about what this project does, the problem it solves, and the impact it had.]',
    tags: ['React', 'TypeScript', 'Node.js'],
    github: 'https://github.com/alexcarter/project-1',
    demo: 'https://project-1.example.com',
    year: 2025,
  },
  {
    id: 'project-2',
    title: '[Project 2]',
    description:
      '[One or two sentences about what this project does, the problem it solves, and the impact it had.]',
    tags: ['Next.js', 'PostgreSQL', 'Tailwind'],
    github: 'https://github.com/alexcarter/project-2',
    demo: 'https://project-2.example.com',
    year: 2024,
  },
  {
    id: 'project-3',
    title: '[Project 3]',
    description:
      '[One or two sentences about what this project does, the problem it solves, and the impact it had.]',
    tags: ['TypeScript', 'GraphQL', 'Docker'],
    github: 'https://github.com/alexcarter/project-3',
    year: 2024,
  },
]
