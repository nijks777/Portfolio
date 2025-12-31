'use client';

import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  credentialUrl: string;
  skills: string[];
}

const certificates: Certificate[] = [
  {
    id: '1',
    title: 'Docker, Kubernetes & AWS with GitHub Actions for DevOps',
    issuer: 'Udemy',
    credentialUrl: 'https://www.udemy.com/certificate/UC-4ef75747-cdfc-4600-ada2-2744f8e4069a/',
    skills: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'DevOps'],
  },
  {
    id: '2',
    title: 'Complete Agentic AI Bootcamp With LangGraph and Langchain',
    issuer: 'Udemy',
    credentialUrl: 'https://www.udemy.com/certificate/UC-e30ff7c2-8264-4583-8f9f-98b13e9f1f08/',
    skills: ['LangGraph', 'LangChain', 'Agentic AI', 'AI Development'],
  },
  {
    id: '3',
    title: 'Fundamentals of Backend Engineering',
    issuer: 'Udemy',
    credentialUrl: 'https://www.udemy.com/certificate/UC-3ec67eb4-aaa6-4e02-a595-5baf683d5858/',
    skills: ['Backend Development', 'System Design', 'APIs', 'Databases'],
  },
  {
    id: '4',
    title: 'The Advanced SQL Server Masterclass For Data Analysis',
    issuer: 'Udemy',
    credentialUrl: 'https://www.udemy.com/certificate/UC-9ffa3c89-7b26-4e2a-b6de-e5ba3324b4f5/',
    skills: ['SQL Server', 'Data Analysis', 'Database Management', 'Analytics'],
  },
  {
    id: '5',
    title: 'Data Storytelling and Data Visualization Mastery',
    issuer: 'Udemy',
    credentialUrl: 'https://www.udemy.com/certificate/UC-64e81ef3-7274-42fb-8d9a-2a281e25bf29/',
    skills: ['Data Visualization', 'Data Storytelling', 'Analytics', 'Presentation'],
  },
  {
    id: '6',
    title: 'Complete Interview Preparation - Self Paced',
    issuer: 'GeeksforGeeks',
    credentialUrl: 'https://media.geeksforgeeks.org/courses/certificates/f00ec168eac9bbd43e818d8cb3ec6499.pdf',
    skills: ['DSA', 'Problem Solving', 'Interview Prep', 'Coding'],
  },
  {
    id: '7',
    title: 'The Complete 2022 Web Development Bootcamp',
    issuer: 'Udemy',
    credentialUrl: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-0db1eef7-d502-4dee-92ca-1d260a5f660a.pdf',
    skills: ['Web Development', 'HTML', 'CSS', 'JavaScript', 'Node.js', 'React'],
  },
];

export default function LearningsPage() {
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
            Certifications & Learning
          </h1>
          <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
            Continuous learning and professional development achievements
          </p>
        </motion.div>

        {/* Certificates Grid */}
        {certificates.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {certificates.map((cert) => (
              <CertificateCard key={cert.id} certificate={cert} variants={itemVariants} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-orange-100">
              <Award className="h-12 w-12 text-orange-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Certificates Coming Soon
            </h3>
            <p className="text-gray-600">
              Professional certifications and learning achievements will be displayed here.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function CertificateCard({
  certificate,
  variants,
}: {
  certificate: Certificate;
  variants: any;
}) {
  return (
    <motion.a
      href={certificate.credentialUrl}
      target="_blank"
      rel="noopener noreferrer"
      variants={variants}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 transition-all hover:shadow-xl cursor-pointer block"
    >
      {/* Certificate Header */}
      <div className="p-4 sm:p-6 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 border-b border-orange-200">
        <div className="flex items-center justify-between mb-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
            className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-orange-500 shadow-md"
          >
            <Award className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </motion.div>

          {/* Issuer Badge */}
          <div className="rounded-full bg-white px-2.5 py-1 sm:px-3 sm:py-1.5 shadow-sm ring-1 ring-orange-200">
            <p className="text-xs font-bold text-orange-600">{certificate.issuer}</p>
          </div>
        </div>

        <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 leading-snug">
          {certificate.title}
        </h3>
      </div>

      {/* Certificate Info */}
      <div className="p-4 sm:p-6">
        {/* Skills */}
        <div className="mb-4 flex flex-wrap gap-1.5 sm:gap-2">
          {certificate.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-orange-50 px-2 py-1 sm:px-3 sm:py-1.5 text-xs font-medium text-orange-700 ring-1 ring-orange-200"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* View Certificate Button */}
        <div className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white shadow-md transition-all group-hover:shadow-lg group-hover:from-orange-600 group-hover:to-orange-700">
          <span>View Certificate</span>
          <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.a>
  );
}
