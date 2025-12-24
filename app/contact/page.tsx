'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, Linkedin, Send, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const contactInfo = {
    phone: '7007752950',
    email: 'jalaj.ka.sharma@gmail.com',
    linkedin: 'https://www.linkedin.com/in/jalaj-sharma-5b1734211/',
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSendEmail = () => {
    window.location.href = `mailto:${contactInfo.email}`;
  };

  const handleCallPhone = () => {
    window.location.href = `tel:${contactInfo.phone}`;
  };

  const handleLinkedIn = () => {
    window.open(contactInfo.linkedin, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
  };

  const floatingTransition = {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 pb-16 pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16 text-center"
        >
          <motion.div
            animate={floatingAnimation}
            transition={floatingTransition}
            className="mb-6 inline-block rounded-full bg-gradient-to-r from-orange-500 to-orange-600 p-4 shadow-lg"
          >
            <Mail className="h-12 w-12 text-white" />
          </motion.div>

          <h1 className="mb-4 bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl">
            Let's Connect
          </h1>

          <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg md:text-xl">
            Feel free to reach out through any of these channels. I'd love to hear from you!
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-3"
        >
          {/* Phone Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-100 transition-shadow hover:shadow-2xl"
          >
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 opacity-50 blur-2xl transition-all group-hover:scale-150" />

            <div className="relative">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-block rounded-full bg-gradient-to-r from-green-500 to-green-600 p-4 shadow-lg"
              >
                <Phone className="h-8 w-8 text-white" />
              </motion.div>

              <h3 className="mb-2 text-xl font-bold text-gray-900">Phone</h3>

              <p className="mb-4 text-xl font-semibold text-orange-600 sm:text-2xl">
                {contactInfo.phone}
              </p>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCallPhone}
                  className="flex-1 cursor-pointer rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-3 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg"
                >
                  <Phone className="mr-2 inline-block h-4 w-4" />
                  Call Now
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => copyToClipboard(contactInfo.phone, 'phone')}
                  className="cursor-pointer rounded-lg border-2 border-green-500 bg-white px-4 py-3 text-green-600 transition-all hover:bg-green-50"
                >
                  {copiedField === 'phone' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Email Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-100 transition-shadow hover:shadow-2xl"
          >
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 opacity-50 blur-2xl transition-all group-hover:scale-150" />

            <div className="relative">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-block rounded-full bg-gradient-to-r from-orange-500 to-orange-600 p-4 shadow-lg"
              >
                <Mail className="h-8 w-8 text-white" />
              </motion.div>

              <h3 className="mb-2 text-xl font-bold text-gray-900">Email</h3>

              <p className="mb-4 break-all text-base font-semibold text-orange-600 sm:text-lg">
                {contactInfo.email}
              </p>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendEmail}
                  className="flex-1 cursor-pointer rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg"
                >
                  <Send className="mr-2 inline-block h-4 w-4" />
                  Send Email
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => copyToClipboard(contactInfo.email, 'email')}
                  className="cursor-pointer rounded-lg border-2 border-orange-500 bg-white px-4 py-3 text-orange-600 transition-all hover:bg-orange-50"
                >
                  {copiedField === 'email' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* LinkedIn Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-100 transition-shadow hover:shadow-2xl"
          >
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 opacity-50 blur-2xl transition-all group-hover:scale-150" />

            <div className="relative">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-block rounded-full bg-gradient-to-r from-blue-600 to-blue-700 p-4 shadow-lg"
              >
                <Linkedin className="h-8 w-8 text-white" />
              </motion.div>

              <h3 className="mb-2 text-xl font-bold text-gray-900">LinkedIn</h3>

              <p className="mb-4 text-sm text-gray-600">
                Connect with me professionally
              </p>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLinkedIn}
                  className="flex-1 cursor-pointer rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg"
                >
                  <Linkedin className="mr-2 inline-block h-4 w-4" />
                  Visit Profile
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => copyToClipboard(contactInfo.linkedin, 'linkedin')}
                  className="cursor-pointer rounded-lg border-2 border-blue-600 bg-white px-4 py-3 text-blue-600 transition-all hover:bg-blue-50"
                >
                  {copiedField === 'linkedin' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -left-32 top-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-orange-300 to-orange-400 opacity-30 blur-3xl"
          />

          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            className="absolute -right-32 bottom-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-blue-300 to-blue-400 opacity-30 blur-3xl"
          />
        </div>
      </div>
    </div>
  );
}
