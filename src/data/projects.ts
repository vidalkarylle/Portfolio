import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'work-001',
    title: '90 Legends',
    category: 'Football Experience',
    description:
      'An interactive football website exploring the sport\'s legendary players, iconic stories, memorable matches, and moments that defined the game.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vite'],
    url: 'https://github.com/vidalkarylle/90-legends',
    year: 2025,
  },
  {
    id: 'work-002',
    title: 'Malinta-Connect',
    category: 'Web Application',
    description:
      'A barangay progressive web application designed to simplify community services and digital document requests for residents and officials.',
    tags: ['React', 'TypeScript', 'PostgreSQL', 'API'],
    url: 'https://github.com/vidalkarylle/malinta-connect',
    liveUrl: 'https://malinta-connect.vercel.app/',
    year: 2024,
  },
  {
    id: 'work-003',
    title: 'ShoeSpot',
    category: 'E-Commerce Interface',
    description:
      'A sneaker-focused web interface exploring product presentation, responsive layouts, and interactive shopping experiences.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Vite'],
    url: 'https://github.com/vidalkarylle/shoespot',
    year: 2024,
  },
]
