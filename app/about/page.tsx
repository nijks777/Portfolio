'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  side: 'left' | 'right';
  image?: string;
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
    description: 'Completed 10th class with 87.4% from VSTCS, marking an important milestone in my academic journey.',
    side: 'right',
    image: '/assets/images/vstcs.jpeg',
  },
  {
    year: '2019',
    title: 'Completed 12th Class',
    description: 'Completed 12th class with 89.75% from VSTCS, preparing for higher education.',
    side: 'left',
    image: '/assets/images/vstcs12.jpg',
  },
  {
    year: '2020-2024',
    title: 'Bachelor of Technology in Computer Science',
    description: 'Completed my Bachelor of Technology in Computer Science from KIET Group of Institutions.',
    side: 'right',
    image: '/assets/images/Kiet.jpeg',
  },
  {
    year: '2024-2025',
    title: 'Associate Developer at Tech Mahindra',
    description: 'Worked as Associate Developer at Tech Mahindra from February 2024 to December 2025.',
    side: 'left',
    image: '/assets/images/techm.jpeg',
  },
];

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  return (
    <div ref={itemRef} className="relative mb-16 flex w-full items-center md:mb-32">
      {/* Desktop Layout - Left Side Content */}
      {event.side === 'left' && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden w-5/12 pr-8 text-right md:block lg:pr-12"
        >
          <div className="inline-block rounded-2xl bg-white p-4 shadow-xl ring-1 ring-gray-100 lg:p-6">
            <h3 className="mb-2 text-xl font-bold text-orange-600 lg:text-2xl">{event.year}</h3>
            <h4 className="mb-3 text-lg font-semibold text-gray-900 lg:text-xl">{event.title}</h4>
            <p className="text-sm text-gray-600 lg:text-base">{event.description}</p>
            {event.image && (
              <div className="mt-4 overflow-hidden rounded-lg">
                <Image
                  src={event.image}
                  alt={event.title}
                  width={400}
                  height={250}
                  className="h-40 w-full object-cover lg:h-48"
                />
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Center Timeline Dot */}
      <div className="absolute left-8 flex flex-col items-center md:left-1/2 md:-translate-x-1/2">
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
          <div className="inline-block rounded-2xl bg-white p-4 shadow-xl ring-1 ring-gray-100 lg:p-6">
            <h3 className="mb-2 text-xl font-bold text-orange-600 lg:text-2xl">{event.year}</h3>
            <h4 className="mb-3 text-lg font-semibold text-gray-900 lg:text-xl">{event.title}</h4>
            <p className="text-sm text-gray-600 lg:text-base">{event.description}</p>
            {event.image && (
              <div className="mt-4 overflow-hidden rounded-lg">
                <Image
                  src={event.image}
                  alt={event.title}
                  width={400}
                  height={250}
                  className="h-40 w-full object-cover lg:h-48"
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
        className="ml-auto w-[calc(100%-4rem)] pl-6 text-left md:hidden"
      >
        <div className="rounded-2xl bg-white p-4 shadow-xl ring-1 ring-gray-100">
          <h3 className="mb-2 text-lg font-bold text-orange-600">{event.year}</h3>
          <h4 className="mb-2 text-base font-semibold text-gray-900">{event.title}</h4>
          <p className="text-sm text-gray-600">{event.description}</p>
          {event.image && (
            <div className="mt-3 overflow-hidden rounded-lg">
              <Image
                src={event.image}
                alt={event.title}
                width={400}
                height={250}
                className="h-36 w-full object-cover"
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20 pt-32">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
            About <span className="text-orange-600">Me</span>
          </h1>
          <p className="text-base text-gray-600 sm:text-lg md:text-xl">My journey through life and career</p>
        </motion.div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          {/* Vertical Line - Background (Mobile: left side, Desktop: center) */}
          <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-200 md:left-1/2 md:w-1 md:-translate-x-1/2" />

          {/* Vertical Line - Animated Progress */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-orange-500 to-orange-600 md:left-1/2 md:w-1 md:-translate-x-1/2"
          />

          {/* Timeline Events */}
          <div className="relative">
            {timelineEvents.map((event, index) => (
              <TimelineItem key={index} event={event} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
