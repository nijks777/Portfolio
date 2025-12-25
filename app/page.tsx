'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Code2, Database, Mail, Github, Linkedin } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white lg:h-screen lg:overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
          className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-gradient-to-br from-orange-200/30 to-orange-300/30 blur-3xl"
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
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-orange-200/30 to-orange-300/30 blur-3xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative mx-auto flex min-h-screen items-center px-4 py-20 sm:px-6 lg:h-full lg:py-0 lg:px-8 max-w-7xl">
        <div className="grid w-full gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col justify-center space-y-8"
          >
            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Hi, I'm{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                    Jalaj Sharma
                  </span>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute bottom-2 left-0 h-3 bg-orange-200/50"
                  />
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-wrap items-center gap-3"
              >
                <span className="text-xl font-semibold text-gray-700 sm:text-2xl md:text-3xl">
                  Full Stack Developer / AI Developer
                </span>
                <span className="flex items-center gap-2">
                  <a
                    href="https://github.com/nijks777"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gray-900 p-2 text-white transition-all hover:scale-110 hover:bg-gray-800 active:scale-95"
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
              className="max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg"
            >
              Passionate AI and Full Stack Developer with <span className="font-semibold text-orange-600">1 year 10 months</span> of professional experience.
              Specialized in building intelligent AI-powered applications using Python and cutting-edge LLM technologies.
              Expert in developing scalable full-stack solutions from frontend to backend, with deep expertise in AI agent development,
              prompt engineering, and integrating advanced AI capabilities into production systems.
            </motion.p>

            {/* Skills Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              {['Python', 'Next.js', 'Node.js', 'C#', '.NET', 'SQL', 'MongoDB', 'LangGraph', 'LangChain', 'FastAPI', 'MCP', 'VPS Hosting'].map(
                (skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md hover:ring-orange-300"
                  >
                    {skill}
                  </motion.span>
                )
              )}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/projects"
                className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
              >
                <span>View My Work</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="group flex items-center gap-2 rounded-full border-2 border-gray-900 bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-md transition-all hover:bg-gray-900 hover:text-white active:scale-95"
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
                className="absolute -right-8 -top-8 h-72 w-72 rounded-full border-2 border-dashed border-orange-300 opacity-30 hidden sm:block"
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
                className="absolute -bottom-8 -left-8 h-72 w-72 rounded-full border-2 border-dashed border-orange-300 opacity-30 hidden sm:block"
              />

              {/* Main Image Container */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative z-10"
              >
                <div className="relative h-[280px] w-[280px] overflow-hidden rounded-full bg-gradient-to-br from-orange-400 to-orange-600 p-2 shadow-2xl sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px] lg:h-[450px] lg:w-[450px]">
                  <div className="relative h-full w-full overflow-hidden rounded-full bg-gray-100">
                    <Image
                      src="/assets/images/jalaj_image.jpeg"
                      alt="Jalaj Sharma - Full Stack Developer"
                      fill
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
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 transform whitespace-nowrap"
                >
                  <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 sm:px-5 sm:py-2.5 shadow-xl ring-1 ring-gray-200">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="h-3 w-3 rounded-full bg-green-500 flex-shrink-0"
                    />
                    <span className="text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
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
                className="absolute -right-6 top-20 z-20 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-gray-200 hidden lg:block"
              >
                <Code2 className="h-8 w-8 text-orange-600" />
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
                className="absolute -left-6 bottom-32 z-20 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-gray-200 hidden lg:block"
              >
                <Database className="h-8 w-8 text-orange-600" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
}
