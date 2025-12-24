'use client';

import { motion } from 'framer-motion';
import { Search, Github, ExternalLink, Code2 } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
  section: 'AI Projects' | 'Games' | 'Small Projects';
}

const projects: Project[] = [
  // AI Projects
  {
    id: 'hire-me',
    name: 'Hire-Me',
    description: 'AI-powered job application platform with intelligent matching and resume optimization',
    techStack: ['Next.js', 'FastAPI', 'LangChain', 'LangGraph', 'LangSmith', 'MCP', 'JWT', 'PostgreSQL'],
    githubUrl: 'https://github.com/nijks777/Hire-Me',
    liveUrl: 'https://hire-me-gules-nine.vercel.app/',
    image: '/projects/hire-me.png',
    section: 'AI Projects',
  },
  {
    id: 'ai-itenary',
    name: 'TravelMind - AI Itinerary Creator',
    description: 'Smart trip planner that creates personalized travel itineraries using AI',
    techStack: ['Next.js', 'OpenAI API', 'Google Places API'],
    githubUrl: 'https://github.com/nijks777/AI-Itenary-Creator',
    liveUrl: 'https://ai-itenary-creator.vercel.app',
    image: '/projects/ai-itenary.png',
    section: 'AI Projects',
  },
  {
    id: 'jksai',
    name: 'Test Your Self',
    description: 'Self-testing application with AI-powered question generation and assessment',
    techStack: ['Next.js', 'JavaScript', 'Supabase (PostgreSQL)', 'VAPI', 'Anthropic', 'OpenAI'],
    githubUrl: 'https://github.com/nijks777/JKSAI',
    liveUrl: 'https://jksai.vercel.app',
    image: '/projects/jksai.png',
    section: 'AI Projects',
  },
  {
    id: 'movie-rag',
    name: 'Movie RAG',
    description: 'RAG-based movie recommendation system with intelligent search and personalized suggestions',
    techStack: ['LangChain', 'LangGraph', 'FastAPI', 'LangSmith', 'RAG', 'Pinecone', 'TMDB API'],
    githubUrl: 'https://github.com/nijks777/Movie_Rag',
    liveUrl: 'https://movie-rag-mu.vercel.app',
    image: '/projects/movie-rag.png',
    section: 'AI Projects',
  },
  // Games
  {
    id: 'sudoku',
    name: 'Sudoku',
    description: 'Single player and multiplayer Sudoku game with real-time gameplay',
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'Socket.IO', 'MongoDB', 'Redis'],
    githubUrl: 'https://github.com/nijks777/sudoku',
    liveUrl: 'https://sudokufrontend1.vercel.app',
    image: '/projects/sudoku.png',
    section: 'Games',
  },
  // Small Projects
  {
    id: 'todo',
    name: 'TODO',
    description: 'Modern task management app with clean UI and intuitive features',
    techStack: ['JavaScript', 'React', 'CSS', 'LocalStorage'],
    githubUrl: 'https://github.com/nijks777/TODO',
    liveUrl: 'https://todo-green-seven-42.vercel.app',
    image: '/projects/todo.png',
    section: 'Small Projects',
  },
  {
    id: 'tinylink',
    name: 'TinyLink',
    description: 'URL shortener service with analytics and custom short links',
    techStack: ['TypeScript', 'Next.js', 'PostgreSQL', 'Prisma'],
    githubUrl: 'https://github.com/nijks777/TinyLink',
    liveUrl: 'https://tiny-link-psi-ten.vercel.app',
    image: '/projects/tinylink.png',
    section: 'Small Projects',
  },
  {
    id: 'shirt-three',
    name: 'Shirt Three',
    description: '3D shirt customizer with real-time preview and design tools',
    techStack: ['JavaScript', 'Three.js', 'React', 'WebGL'],
    githubUrl: 'https://github.com/nijks777/Shirt_Three',
    liveUrl: 'https://shirt-three-seven.vercel.app',
    image: '/projects/shirt-three.png',
    section: 'Small Projects',
  },
  {
    id: 'notes-app',
    name: 'Notes App',
    description: 'Simple and elegant note-taking application with markdown support',
    techStack: ['JavaScript', 'React', 'Markdown', 'LocalStorage'],
    githubUrl: 'https://github.com/nijks777/Notes_app',
    liveUrl: 'https://notes-app-nijks777.vercel.app',
    image: '/projects/notes-app.png',
    section: 'Small Projects',
  },
];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase();
    return (
      project.name.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.section.toLowerCase().includes(query) ||
      project.techStack.some((tech) => tech.toLowerCase().includes(query))
    );
  });

  const groupedProjects = {
    'AI Projects': filteredProjects.filter((p) => p.section === 'AI Projects'),
    Games: filteredProjects.filter((p) => p.section === 'Games'),
    'Small Projects': filteredProjects.filter((p) => p.section === 'Small Projects'),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 pb-16 pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl">
            My Projects
          </h1>
          <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
            Explore my portfolio of web applications, AI projects, games, and more
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto mb-12 max-w-2xl"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by project name, tech stack, or section..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border-2 border-gray-200 bg-white py-4 pl-12 pr-6 text-gray-900 shadow-lg transition-all focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
        </motion.div>

        {/* Projects by Section */}
        <div className="space-y-16">
          {Object.entries(groupedProjects).map(([section, sectionProjects]) => {
            if (sectionProjects.length === 0) return null;

            return (
              <motion.div
                key={section}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <h2 className="mb-8 text-3xl font-bold text-gray-900">{section}</h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {sectionProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} variants={itemVariants} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <p className="text-xl text-gray-500">No projects found matching your search.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  variants,
}: {
  project: Project;
  variants: any;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-100 transition-all hover:shadow-2xl"
    >
      {/* Tech Stack Badge */}
      <div className="absolute right-4 top-4 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
          className="rounded-full bg-white px-3 py-1.5 shadow-lg ring-1 ring-gray-200"
        >
          <div className="flex items-center gap-1">
            <Code2 className="h-3 w-3 text-orange-600" />
            <span className="text-xs font-medium text-gray-700">Tech Stack</span>
          </div>
        </motion.div>
      </div>

      {/* Project Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-orange-100 to-orange-200">
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <div className="mb-2 text-6xl">🚀</div>
            <p className="text-sm font-medium text-orange-800">{project.name}</p>
          </div>
        </div>

        {/* Tech Stack Overlay on Hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center bg-black/80 p-4"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-orange-500 px-3 py-1 text-xs font-medium text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold text-gray-900">{project.name}</h3>
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">{project.description}</p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
            >
              <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              Live Link
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`group/btn flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:scale-105 hover:border-gray-400 hover:bg-gray-50 ${
              project.liveUrl ? 'flex-1' : 'w-full'
            }`}
          >
            <Github className="h-4 w-4 transition-transform group-hover/btn:rotate-12" />
            Github Link
          </a>
        </div>
      </div>
    </motion.div>
  );
}
