import { Project, SkillCategory } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: "Vaibhav Chawla",
  role: "AI/ML Engineer & Creative Web Developer",
  tagline: "Bridging Artificial Intelligence, Computer Vision, and Immersive Digital Experiences.",
  email: "vaibhavchawla1201@gmail.com",
  phone: "+91 9310966968",
  linkedin: "https://www.linkedin.com/in/vaibhav-chawla-376b0731a/",
  github: "https://github.com/Vaibhav21072006",
  location: "India",
  education: {
    degree: "Bachelor of Computer Applications (BCA) — AIML Specialization",
    institution: "Manav Rachna International Institute of Research and Studies",
    timeline: "2024 — 2027 (Expected)",
    status: "Active Thesis & Applied Research"
  }
};

export const PROJECTS: Project[] = [
  {
    id: "interview-elite",
    title: "Interview Elite",
    tagline: "AI-Powered Technical Mock Interview & Resume Diagnostic Platform",
    description: "An end-to-end intelligent career preparation ecosystem leveraging Google's Gemini API to simulate dynamic, multi-turn technical interviews and deliver deep actionable resume analytics.",
    status: "Live",
    category: "AI / ML",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Gemini API", "Vercel"],
    features: [
      "Simulates 6 custom context-aware interview questions dynamic to user domain",
      "Real-time evaluation of verbal and technical completeness",
      "Gemini-backed resume parser rendering actionable strength/gap feedback",
      "Sub-second API response orchestrator"
    ],
    challenges: "Managing state across multi-turn conversational AI without losing interview context or exceeding API rate limits.",
    solutions: "Designed a lightweight token sliding window and custom queueing mechanism in TypeScript for seamless context preservation.",
    githubUrl: "https://github.com/Vaibhav21072006",
    liveUrl: "https://interview-elite.vercel.app/",
    featured: true
  },
  {
    id: "airshield-tryon",
    title: "AirShield — AI Virtual Try-On",
    tagline: "Computer Vision Pose Estimation & Garment Simulation Framework",
    description: "Deep-learning application designed to compute body pose proportions from visual data and map garments accurately onto user images in real time.",
    status: "In Progress",
    category: "Computer Vision",
    techStack: ["Python", "PyTorch", "OpenCV", "MediaPipe", "React", "Flask"],
    features: [
      "Keypoint-based body geometry extraction and scale mapping",
      "Deformable garment warping relative to torso orientation",
      "Interactive web UI preview"
    ],
    challenges: "Handling real-world occlusions and variable ambient light conditions during pose landmark detection.",
    solutions: "Integrated pre-filtered MediaPipe pose landmarking combined with affine dynamic warping filters.",
    githubUrl: "https://github.com/Vaibhav21072006",
    featured: true
  },
  {
    id: "smart-navigation",
    title: "EcoNav — Pollution-Aware Navigation",
    tagline: "Dual-Objective Pathfinding Algorithm for Minimal AQI Exposure",
    description: "Spatial routing system that dynamically recalculates path choices by balancing geometric distance against real-time Air Quality Index (AQI) telemetry.",
    status: "In Progress",
    category: "Algorithms",
    techStack: ["Python", "A* Algorithm", "OpenStreetMap API", "AQI Sensor Data", "React"],
    features: [
      "Custom multi-objective pathfinding optimization",
      "Real-time AQI heatmap integration",
      "Interactive path comparison metrics dashboard"
    ],
    challenges: "Balancing exponential route expansion time when evaluating dual-weighted heuristics.",
    solutions: "Implemented bounded Pareto-optimal search trees with cached spatial grid clusters.",
    githubUrl: "https://github.com/Vaibhav21072006",
    featured: true
  },
  {
    id: "snapchat-ar",
    title: "Snapchat Spatial AR Experience",
    tagline: "Custom Interactive Augmented Reality Lenses",
    description: "Suite of spatial AR experiences created with Snapchat Lens Studio, featuring original 3D assets, custom shader logic, and real-time facial tracking.",
    status: "Completed",
    category: "Spatial & AR",
    techStack: ["Snapchat Lens Studio", "JavaScript", "Blender", "3D Modeling", "Shader Graph"],
    features: [
      "Real-time face tracking and deformation effects",
      "Custom dynamic lighting and material shaders",
      "Published and used by tens of thousands of users"
    ],
    challenges: "Optimizing high-polygon 3D meshes to maintain 60 FPS performance on mobile devices.",
    solutions: "Retopologized high-poly meshes into low-poly LOD models and baked high-res lighting into normal maps.",
    liveUrl: "https://snapchat.com",
    featured: true
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "AI & Machine Learning",
    skills: [
      { name: "Gemini API Integration", level: 92, highlight: true },
      { name: "Computer Vision (OpenCV)", level: 85, highlight: true },
      { name: "Deep Learning (PyTorch/TF)", level: 80 },
      { name: "Pose Estimation & Keypoints", level: 82 }
    ]
  },
  {
    category: "Frontend & Creative Engineering",
    skills: [
      { name: "React / Vite", level: 90, highlight: true },
      { name: "TypeScript", level: 88, highlight: true },
      { name: "Tailwind CSS", level: 95 },
      { name: "GSAP & Framer Motion", level: 85, highlight: true }
    ]
  },
  {
    category: "Programming & Backend",
    skills: [
      { name: "Python", level: 90 },
      { name: "Java", level: 82 },
      { name: "C", level: 75 },
      { name: "SQL & Relational DBs", level: 85 }
    ]
  },
  {
    category: "Spatial, AR & Design",
    skills: [
      { name: "Snapchat Lens Studio", level: 88, highlight: true },
      { name: "Tableau Data Viz", level: 80 },
      { name: "Video Production & Editing", level: 90 },
      { name: "UI/UX & Prototyping", level: 85 }
    ]
  }
];

export const EXPERIENCE = [
  {
    role: "Web Developer Intern",
    company: "RL Group (Air Canada GSA)",
    period: "2 Months (2025)",
    location: "India",
    summary: "Supported digital infrastructure for Air Canada's General Sales Agent (GSA) operations, improving operational web portals and internal user workflows.",
    highlights: [
      "Optimized frontend components for high reliability across operational units.",
      "Collaborated with cross-functional support teams managing high-volume airline query systems.",
      "Refactored legacy UI sections into clean, modular, modern web modules."
    ]
  }
];

export const CERTIFICATIONS = [
  { title: "AWS Blockchain Node Runners", issuer: "BNB Chain / AWS", year: "2024" },
  { title: "Snapchat AR Developer Certificate", issuer: "Snap Inc.", year: "2024" },
  { title: "Tableau Data Visualization Specialist", issuer: "Tableau Workshop", year: "2024" },
  { title: "ACE Hack Pre-Meetup", issuer: "Microsoft Gurgaon", year: "2024" },
  { title: "Hack or Crack Hackathon Finalist", issuer: "Tech Community", year: "2024" }
];