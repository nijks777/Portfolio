'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Code2,
  Database,
  Mail,
  Github,
  Linkedin,
} from 'lucide-react';

// Career start: 5 February 2024 (month is 0-indexed, so 1 = February)
const CAREER_START_DATE = new Date(2024, 1, 5);

function getExperienceDuration(startDate: Date = CAREER_START_DATE): string {
  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();

  // Day of month hasn't been reached yet this month, so the month isn't complete
  if (now.getDate() < startDate.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years < 0) return '0 months';

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);

  return parts.length > 0 ? parts.join(' ') : 'less than a month';
}

export default function Home() {
  const experience = getExperienceDuration();

  return (
    <div className="bg-bg relative min-h-screen overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="from-accent/20 to-accent/10 absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="from-accent/20 to-accent/10 absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr blur-3xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative mx-auto flex min-h-[100dvh] max-w-7xl items-center px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-20 lg:px-8 lg:pt-40 lg:pb-24">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col justify-center space-y-6 sm:space-y-8"
          >
            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-fg-strong text-4xl leading-tight font-bold sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl"
              >
                Hi, I&apos;m{' '}
                <span className="relative inline-block">
                  <span className="text-accent relative z-10">
                    Jalaj Sharma
                  </span>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="bg-accent/25 absolute bottom-1 left-0 h-2"
                  />
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-wrap items-center gap-3"
              >
                <span className="text-fg text-xl font-semibold sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl">
                  Software Developer / AI Developer
                </span>
                <span className="flex items-center gap-2">
                  <a
                    href="https://github.com/nijks777"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-border bg-surface-2 text-fg hover:border-border-strong hover:bg-surface-hover rounded-full border p-2 transition-all hover:scale-110 active:scale-95"
                    aria-label="GitHub Profile"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jalaj-sharma-5b1734211"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-blue-600 p-2 text-white transition-all hover:scale-110 hover:bg-blue-700 active:scale-95"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </span>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-muted max-w-xl text-base leading-relaxed sm:text-lg"
            >
              Software Developer with{' '}
              <span className="text-accent font-semibold" suppressHydrationWarning>
                {experience}
              </span>{' '}
              of professional experience building applications that run at
              scale. Currently at{' '}
              <span className="text-fg-strong font-semibold">
                Sigma Staffing Solutions
              </span>
              , where I own{' '}
              <span className="text-fg-strong font-semibold">ProcessPulse</span>
              , an HRMS platform serving 20+ clients &mdash; I built its
              payroll, leave and onsite attendance systems &mdash; and built{' '}
              <span className="text-fg-strong font-semibold">Job24</span>, their
              job portal, from scratch with granular permissioning. I ship end
              to end: FastAPI, Python and PostgreSQL through to hosting on
              Ubuntu/Linux VPS infrastructure. I also build next-gen AI-powered
              applications with GenAI and agentic AI.
            </motion.p>

            {/* Skills Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-2 sm:gap-3"
            >
              {[
                'FastAPI',
                'Python',
                'PostgreSQL',
                '.NET',
                'VPS Hosting (Ubuntu/Linux)',
                'Backend Principles',
                'System Design',
                'GenAI',
                'Agentic AI',
              ].map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.07, duration: 0.4 }}
                  className="bg-surface text-fg ring-border hover:ring-accent rounded-full px-3 py-1.5 text-xs font-medium shadow-sm ring-1 transition-all hover:shadow-md sm:px-4 sm:py-2 sm:text-sm"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-3 sm:gap-4"
            >
              <Link
                href="/projects"
                className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95 sm:px-8 sm:py-4 sm:text-base"
              >
                <span>View My Work</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="group border-border-strong bg-surface-2 text-fg-strong hover:border-accent hover:text-accent flex items-center gap-2 rounded-full border-2 px-6 py-3 text-sm font-semibold shadow-md transition-all active:scale-95 sm:px-8 sm:py-4 sm:text-base"
              >
                <Mail className="h-5 w-5" />
                <span>Get In Touch</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative Elements */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute -top-8 -right-8 hidden h-72 w-72 rounded-full border-2 border-dashed border-orange-300 opacity-30 sm:block"
              />
              <motion.div
                animate={{
                  rotate: [360, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute -bottom-8 -left-8 hidden h-72 w-72 rounded-full border-2 border-dashed border-orange-300 opacity-30 sm:block"
              />

              {/* Main Image Container */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative z-10"
              >
                <div className="relative h-[240px] w-[240px] overflow-hidden rounded-full bg-gradient-to-br from-orange-400 to-orange-600 p-2 shadow-2xl sm:h-[320px] sm:w-[320px] md:h-[380px] md:w-[380px] lg:h-[360px] lg:w-[360px] xl:h-[440px] xl:w-[440px]">
                  <div className="bg-surface-2 relative h-full w-full overflow-hidden rounded-full">
                    <Image
                      src="/assets/images/jalaj_image.jpeg"
                      alt="Jalaj Sharma - Software Developer"
                      fill
                      sizes="(max-width: 640px) 240px, (max-width: 768px) 320px, (max-width: 1280px) 380px, 440px"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="absolute -bottom-4 left-1/2 w-max max-w-[85vw] -translate-x-1/2 transform"
                >
                  <div className="bg-surface ring-border flex items-center gap-2 rounded-full px-3 py-1.5 shadow-xl ring-1 sm:px-5 sm:py-2.5">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="h-3 w-3 flex-shrink-0 rounded-full bg-green-500"
                    />
                    <span className="text-fg-strong text-xs font-medium whitespace-nowrap sm:text-sm">
                      Available for opportunities
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating Tech Icons */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="bg-surface ring-border absolute top-20 -right-6 z-20 hidden rounded-2xl p-4 shadow-xl ring-1 lg:block"
              >
                <Code2 className="text-accent h-8 w-8" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
                className="bg-surface ring-border absolute bottom-32 -left-6 z-20 hidden rounded-2xl p-4 shadow-xl ring-1 lg:block"
              >
                <Database className="text-accent h-8 w-8" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
