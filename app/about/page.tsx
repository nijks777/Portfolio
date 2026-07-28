'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  side: 'left' | 'right';
  image?: string;
  /** Logos need 'contain' so they aren't cropped; photos use the default 'cover'. */
  imageFit?: 'cover' | 'contain';
}

const timelineEvents: TimelineEvent[] = [
  {
    year: '2001',
    title: 'Born in Kanpur',
    description: 'I was born on 7th July 2001 in Kanpur, Uttar Pradesh.',
    side: 'left',
    image: '/assets/images/Kanpur.jpg',
  },
  {
    year: '2004',
    title: 'Started Education in Kindergarten',
    description: 'Started my educational journey at Rose Buds Kindergarten.',
    side: 'right',
    image: '/assets/images/Rose Buds.jpeg',
  },
  {
    year: '2007',
    title: 'Joined VSTCS School',
    description: 'Joined VSTCS in 1st class, beginning my formal schooling.',
    side: 'left',
    image: '/assets/images/vstcs.jpeg',
  },
  {
    year: '2017',
    title: 'Completed 10th Class',
    description:
      'Completed 10th class with 87.4% from VSTCS, marking an important milestone in my academic journey.',
    side: 'right',
    image: '/assets/images/vstcs.jpeg',
  },
  {
    year: '2019',
    title: 'Completed 12th Class',
    description:
      'Completed 12th class with 89.75% from VSTCS, preparing for higher education.',
    side: 'left',
    image: '/assets/images/vstcs12.jpg',
  },
  {
    year: '2020-2024',
    title: 'Bachelor of Technology in Computer Science',
    description:
      'Completed my Bachelor of Technology in Computer Science from KIET Group of Institutions.',
    side: 'right',
    image: '/assets/images/Kiet.jpeg',
  },
  {
    year: '2024 - 2025',
    title: 'Associate Developer at Tech Mahindra',
    description:
      'Spent 1 year 10 months at Tech Mahindra, from February 2024 to December 2025. Worked across FastAPI and ASP.NET MVC applications, built WhatsApp chatbots, and started working on generative AI features in production systems.',
    side: 'left',
    image: '/assets/images/techm.jpeg',
  },
  {
    year: '2026 - Present',
    title: 'Software Developer at Sigma Staffing Solutions',
    description:
      'Joined Sigma Staffing Solutions in January 2026 as a Software Developer. I own and extend ProcessPulse, their HRMS platform serving 20+ clients, where I built the payroll engine, the leave management system and the onsite attendance checking system end to end. I also built Job24, their job portal, from scratch — designed to scale, with granular role-based permissioning. I ship these applications end to end: building the features, hosting them, and setting up the Ubuntu/Linux VPS infrastructure they run on.',
    side: 'right',
    image: '/assets/images/sigma-staffing.jpg',
    imageFit: 'contain',
  },
];

function TimelineItem({ event }: { event: TimelineEvent }) {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = itemRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={itemRef}
      className="relative mb-16 flex w-full items-center md:mb-32"
    >
      {/* Desktop Layout - Left Side Content */}
      {event.side === 'left' && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden w-5/12 pr-8 text-right md:block lg:pr-12"
        >
          <div className="bg-surface ring-border inline-block rounded-2xl p-4 shadow-xl ring-1 lg:p-6">
            <h3 className="text-accent mb-2 text-xl font-bold lg:text-2xl">
              {event.year}
            </h3>
            <h4 className="text-fg-strong mb-3 text-lg font-semibold lg:text-xl">
              {event.title}
            </h4>
            <p className="text-muted text-sm lg:text-base">
              {event.description}
            </p>
            {event.image && (
              <div className="mt-4 overflow-hidden rounded-lg">
                <Image
                  src={event.image}
                  alt={event.title}
                  width={400}
                  height={250}
                  className={cn(
                    'h-40 w-full lg:h-48',
                    event.imageFit === 'contain'
                      ? 'bg-white object-contain p-4'
                      : 'object-cover'
                  )}
                />
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Center Timeline Dot — -translate-x-1/2 at every breakpoint so the dot
          stays centred on the vertical line (mobile: left-8, desktop: left-1/2) */}
      <div className="absolute left-8 flex -translate-x-1/2 flex-col items-center md:left-1/2">
        {/* Flickering Dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isVisible
              ? {
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1],
                }
              : { scale: 0, opacity: 0 }
          }
          transition={{
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            opacity: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          className="relative z-10 h-5 w-5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg md:h-6 md:w-6"
        >
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 rounded-full bg-orange-400"
          />
        </motion.div>
      </div>

      {/* Desktop Layout - Right Side Content */}
      {event.side === 'right' && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="ml-auto hidden w-5/12 pl-8 text-left md:block lg:pl-12"
        >
          <div className="bg-surface ring-border inline-block rounded-2xl p-4 shadow-xl ring-1 lg:p-6">
            <h3 className="text-accent mb-2 text-xl font-bold lg:text-2xl">
              {event.year}
            </h3>
            <h4 className="text-fg-strong mb-3 text-lg font-semibold lg:text-xl">
              {event.title}
            </h4>
            <p className="text-muted text-sm lg:text-base">
              {event.description}
            </p>
            {event.image && (
              <div className="mt-4 overflow-hidden rounded-lg">
                <Image
                  src={event.image}
                  alt={event.title}
                  width={400}
                  height={250}
                  className={cn(
                    'h-40 w-full lg:h-48',
                    event.imageFit === 'contain'
                      ? 'bg-white object-contain p-4'
                      : 'object-cover'
                  )}
                />
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Mobile Layout - All Items on Right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="ml-auto w-[calc(100%-3.5rem)] text-left md:hidden"
      >
        <div className="bg-surface ring-border rounded-2xl p-4 shadow-xl ring-1">
          <h3 className="text-accent mb-2 text-lg font-bold">{event.year}</h3>
          <h4 className="text-fg-strong mb-2 text-base font-semibold">
            {event.title}
          </h4>
          <p className="text-muted text-sm">{event.description}</p>
          {event.image && (
            <div className="mt-3 overflow-hidden rounded-lg">
              <Image
                src={event.image}
                alt={event.title}
                width={400}
                height={250}
                className={cn(
                  'h-36 w-full',
                  event.imageFit === 'contain'
                    ? 'bg-white object-contain p-3'
                    : 'object-cover'
                )}
              />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="bg-bg min-h-screen pt-24 pb-20 sm:pt-28 lg:pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center sm:mb-20"
        >
          <h1 className="text-fg-strong mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            About <span className="text-accent">Me</span>
          </h1>
          <p className="text-muted text-base sm:text-lg md:text-xl">
            My journey through life and career
          </p>
          <p className="text-muted mx-auto mt-6 max-w-2xl text-sm leading-relaxed sm:text-base">
            I&apos;m a Software Developer with{' '}
            <span className="text-accent font-semibold">2 years 6 months</span>{' '}
            of professional experience, currently at Sigma Staffing Solutions.
            I&apos;ve worked on applications running at scale, designed scalable
            systems, and built next-gen AI-powered applications.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          {/* Vertical Line - Background (Mobile: left side, Desktop: center) */}
          <div className="bg-border absolute top-0 left-8 h-full w-0.5 -translate-x-1/2 md:left-1/2 md:w-1" />

          {/* Vertical Line - Animated Progress */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute top-0 left-8 w-0.5 -translate-x-1/2 bg-gradient-to-b from-orange-500 to-orange-600 md:left-1/2 md:w-1"
          />

          {/* Timeline Events */}
          <div className="relative">
            {timelineEvents.map((event, index) => (
              <TimelineItem key={index} event={event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
