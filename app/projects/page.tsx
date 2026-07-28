'use client';

import { motion, type Variants } from 'framer-motion';
import {
  Search,
  Github,
  ExternalLink,
  Code2,
  Globe,
  Play,
  Apple,
} from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type Section =
  | 'Sigma Staffing Projects'
  | 'AI Projects'
  | 'Games'
  | 'Small Projects';

/** Render order on the page. Sigma work leads. */
const SECTION_ORDER: Section[] = [
  'Sigma Staffing Projects',
  'AI Projects',
  'Games',
  'Small Projects',
];

interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  /** Product links, used by the Sigma Staffing cards. */
  webUrl?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  /** Optional screenshot. Without one, the card falls back to generated cover art. */
  image?: string;
  section: Section;
}

/** Cover palette. Written as full class strings so Tailwind can see them. */
const COVER_GRADIENTS = [
  'from-orange-500 to-amber-600',
  'from-rose-500 to-orange-600',
  'from-violet-500 to-indigo-600',
  'from-sky-500 to-blue-600',
  'from-emerald-500 to-teal-600',
  'from-fuchsia-500 to-purple-600',
];

/** Deterministic cover art, so a project keeps the same colour across renders. */
function projectCover(project: Project) {
  const hash = [...project.id].reduce(
    (sum, char) => sum + char.charCodeAt(0),
    0
  );

  const words = project.name
    // Split camelCase too, so "TinyLink" reads as TL rather than T.
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .split(' ')
    .filter(Boolean);

  // Single-word names would only yield one letter, so take two characters.
  const initials =
    words.length > 1
      ? words
          .slice(0, 2)
          .map((word) => word[0])
          .join('')
          .toUpperCase()
      : (words[0] ?? project.id).slice(0, 2).toUpperCase();

  return {
    gradient: COVER_GRADIENTS[hash % COVER_GRADIENTS.length],
    initials,
  };
}

const projects: Project[] = [
  // Sigma Staffing Projects — professional work
  {
    id: 'processpulse',
    name: 'ProcessPulse',
    description:
      'Complete HRMS platform serving 20+ clients. I own the product and built the payroll engine, leave management, and onsite attendance checking systems end to end.',
    techStack: [
      'FastAPI',
      'Python',
      'PostgreSQL',
      '.NET',
      'React',
      'VPS Hosting',
      'System Design',
    ],
    webUrl: 'https://processpulse.co.in',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.processpulse.hrms',
    appStoreUrl: 'https://apps.apple.com/in/app/process-pulse/id6758504592',
    section: 'Sigma Staffing Projects',
  },
  {
    id: 'job24',
    name: 'Job24',
    description:
      'Job portal built from scratch, designed to scale, with granular role-based permissioning across recruiters, employers and candidates.',
    techStack: [
      'FastAPI',
      'Python',
      'PostgreSQL',
      'RBAC',
      'System Design',
      'VPS Hosting',
    ],
    webUrl: 'https://job24.co.in',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.sigmastaffing.job24',
    appStoreUrl: 'https://apps.apple.com/in/app/job24/id6762269245',
    section: 'Sigma Staffing Projects',
  },
  // AI Projects
  {
    id: 'hire-me',
    name: 'Hire-Me',
    description:
      'AI-powered job application platform with intelligent matching and resume optimization',
    techStack: [
      'Next.js',
      'FastAPI',
      'LangChain',
      'LangGraph',
      'LangSmith',
      'MCP',
      'JWT',
      'PostgreSQL',
    ],
    githubUrl: 'https://github.com/nijks777/Hire-Me',
    liveUrl: 'https://hire-me-gules-nine.vercel.app/',
    section: 'AI Projects',
  },
  {
    id: 'ai-itenary',
    name: 'TravelMind - AI Itinerary Creator',
    description:
      'Smart trip planner that creates personalized travel itineraries using AI',
    techStack: ['Next.js', 'OpenAI API', 'Google Places API'],
    githubUrl: 'https://github.com/nijks777/AI-Itenary-Creator',
    liveUrl: 'https://ai-itenary-creator.vercel.app',
    section: 'AI Projects',
  },
  {
    id: 'jksai',
    name: 'Test Your Self',
    description:
      'Self-testing application with AI-powered question generation and assessment',
    techStack: [
      'Next.js',
      'JavaScript',
      'Supabase (PostgreSQL)',
      'VAPI',
      'Anthropic',
      'OpenAI',
    ],
    githubUrl: 'https://github.com/nijks777/JKSAI',
    liveUrl: 'https://jksai.vercel.app',
    section: 'AI Projects',
  },
  {
    id: 'movie-rag',
    name: 'Movie RAG',
    description:
      'RAG-based movie recommendation system with intelligent search and personalized suggestions',
    techStack: [
      'LangChain',
      'LangGraph',
      'FastAPI',
      'LangSmith',
      'RAG',
      'Pinecone',
      'TMDB API',
    ],
    githubUrl: 'https://github.com/nijks777/Movie_Rag',
    liveUrl: 'https://movie-rag-mu.vercel.app',
    section: 'AI Projects',
  },
  // Games
  {
    id: 'sudoku',
    name: 'Sudoku',
    description:
      'Single player and multiplayer Sudoku game with real-time gameplay',
    techStack: [
      'Next.js',
      'TypeScript',
      'Node.js',
      'Socket.IO',
      'MongoDB',
      'Redis',
    ],
    githubUrl: 'https://github.com/nijks777/sudoku',
    liveUrl: 'https://sudokufrontend1.vercel.app',
    section: 'Games',
  },
  // Small Projects
  {
    id: 'todo',
    name: 'TODO',
    description:
      'Modern task management app with clean UI and intuitive features',
    techStack: ['JavaScript', 'React', 'CSS', 'LocalStorage'],
    githubUrl: 'https://github.com/nijks777/TODO',
    liveUrl: 'https://todo-green-seven-42.vercel.app',
    section: 'Small Projects',
  },
  {
    id: 'tinylink',
    name: 'TinyLink',
    description: 'URL shortener service with analytics and custom short links',
    techStack: ['TypeScript', 'Next.js', 'PostgreSQL', 'Prisma'],
    githubUrl: 'https://github.com/nijks777/TinyLink',
    liveUrl: 'https://tiny-link-psi-ten.vercel.app',
    section: 'Small Projects',
  },
  {
    id: 'shirt-three',
    name: 'Shirt Three',
    description: '3D shirt customizer with real-time preview and design tools',
    techStack: ['JavaScript', 'Three.js', 'React', 'WebGL'],
    githubUrl: 'https://github.com/nijks777/Shirt_Three',
    liveUrl: 'https://shirt-three-seven.vercel.app',
    section: 'Small Projects',
  },
  {
    id: 'notes-app',
    name: 'Notes App',
    description:
      'Simple and elegant note-taking application with markdown support',
    techStack: ['JavaScript', 'React', 'Markdown', 'LocalStorage'],
    githubUrl: 'https://github.com/nijks777/Notes_app',
    liveUrl: 'https://notes-app-nijks777.vercel.app',
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

  const groupedProjects = SECTION_ORDER.map((section) => ({
    section,
    items: filteredProjects.filter((p) => p.section === section),
  }));

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="bg-bg min-h-screen pt-24 pb-16 sm:pt-28 lg:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-fg-strong mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">
            My Projects
          </h1>
          <p className="text-muted mx-auto max-w-2xl text-base sm:text-lg">
            Explore my portfolio of web applications, AI projects, games, and
            more
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
            <Search className="text-muted absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by project name, tech stack, or section..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-border bg-surface text-fg-strong w-full rounded-full border-2 py-4 pr-6 pl-12 shadow-lg transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
            />
          </div>
        </motion.div>

        {/* Projects by Section */}
        <div className="space-y-16">
          {groupedProjects.map(({ section, items }) => {
            if (items.length === 0) return null;

            const isSigma = section === 'Sigma Staffing Projects';

            return (
              <motion.div
                key={section}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-fg-strong text-2xl font-bold sm:text-3xl">
                    {section}
                  </h2>
                  {isSigma && (
                    <p className="text-muted mt-2 text-sm sm:text-base">
                      Products I build and maintain as a Software Developer at
                      Sigma Staffing Solutions
                    </p>
                  )}
                </div>
                <div
                  className={cn(
                    'grid gap-6 sm:grid-cols-2 sm:gap-8',
                    !isSigma && 'lg:grid-cols-3'
                  )}
                >
                  {items.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      variants={itemVariants}
                    />
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
            <p className="text-muted text-xl">
              No projects found matching your search.
            </p>
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
  variants: Variants;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cover = projectCover(project);

  // Only render tiles for platforms that actually have a link.
  const storeLinks = [
    { label: 'Web', href: project.webUrl, icon: Globe },
    { label: 'Play Store', href: project.playStoreUrl, icon: Play },
    { label: 'App Store', href: project.appStoreUrl, icon: Apple },
  ].filter(
    (link): link is { label: string; href: string; icon: typeof Globe } =>
      Boolean(link.href)
  );

  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group bg-surface ring-border relative overflow-hidden rounded-2xl shadow-xl ring-1 transition-all hover:shadow-2xl"
    >
      {/* Tech Stack Badge */}
      <div className="absolute top-4 right-4 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
          className="bg-surface ring-border rounded-full px-3 py-1.5 shadow-lg ring-1"
        >
          <div className="flex items-center gap-1">
            <Code2 className="text-accent h-3 w-3" />
            <span className="text-fg text-xs font-medium">Tech Stack</span>
          </div>
        </motion.div>
      </div>

      {/* Project cover: real screenshot when one exists, generated art otherwise */}
      <div
        className={cn(
          'relative h-44 w-full overflow-hidden sm:h-48',
          !project.image && `bg-gradient-to-br ${cover.gradient}`
        )}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} screenshot`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <>
            {/* Soft light wash so the flat gradient reads as artwork */}
            <div className="absolute -top-12 -right-10 h-36 w-36 rounded-full bg-white/20 blur-2xl" />
            <div className="absolute -bottom-14 -left-8 h-40 w-40 rounded-full bg-black/10 blur-2xl" />

            <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
              <span className="text-4xl font-bold tracking-tight text-white drop-shadow-sm sm:text-5xl">
                {cover.initials}
              </span>
              <p className="mt-2 text-sm font-medium text-white/90">
                {project.name}
              </p>
            </div>
          </>
        )}

        {/* Tech Stack Overlay on Hover — pointer devices only. Touch devices
            never fire hover, so the stack is listed inline below instead. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none absolute inset-0 hidden items-center justify-center bg-black/80 p-4 [@media(hover:hover)]:flex"
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
      <div className="p-5 sm:p-6">
        <h3 className="text-fg-strong mb-2 text-lg font-bold sm:text-xl">
          {project.name}
        </h3>
        <p className="text-muted mb-4 line-clamp-2 text-sm">
          {project.description}
        </p>

        {/* Tech Stack — always visible where hover is unavailable */}
        <div className="mb-4 flex flex-wrap gap-1.5 [@media(hover:hover)]:hidden">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="bg-accent-soft text-accent ring-border rounded-full px-2.5 py-1 text-xs font-medium ring-1"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Product links (Web / Play Store / App Store) — one tile per platform */}
        {storeLinks.length > 0 && (
          <div
            className={cn(
              'mb-3 grid gap-2',
              // Static class strings so Tailwind can see them.
              storeLinks.length === 1 && 'grid-cols-1',
              storeLinks.length === 2 && 'grid-cols-2',
              storeLinks.length >= 3 && 'grid-cols-3'
            )}
          >
            {storeLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn border-border bg-accent-soft hover:border-accent hover:bg-accent-soft flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 px-2 py-3 text-center transition-all"
              >
                <Icon className="text-accent h-5 w-5 transition-transform group-hover/btn:scale-110" />
                <span className="text-accent text-[11px] leading-tight font-semibold">
                  {label}
                </span>
              </a>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        {(project.liveUrl || project.githubUrl) && (
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn flex min-w-[7.5rem] flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-3 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
              >
                <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                Live Link
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'group/btn border-border-strong bg-surface text-fg hover:border-border-strong hover:bg-surface-2 flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 px-3 py-2.5 text-sm font-medium transition-all hover:scale-105',
                  project.liveUrl ? 'min-w-[7.5rem] flex-1' : 'w-full'
                )}
              >
                <Github className="h-4 w-4 transition-transform group-hover/btn:rotate-12" />
                Github Link
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
