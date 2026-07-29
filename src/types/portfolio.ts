export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  status: 'Live' | 'In Progress' | 'Completed';
  category: 'AI / ML' | 'Computer Vision' | 'Spatial & AR' | 'Algorithms';
  techStack: string[];
  features: string[];
  challenges: string;
  solutions: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  position3D?: [number, number, number];
  accentColor?: string;
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: number; highlight?: boolean }[];
}