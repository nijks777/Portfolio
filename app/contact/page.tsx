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
    ease: 'easeInOut' as const,
  };

  return (
    <div className="bg-bg relative min-h-screen overflow-hidden pt-24 pb-16 sm:pt-28 lg:pt-32">
      {/* Decorative Elements — siblings of the content, behind it. Previously
          these sat inside the content container and pushed the page wider than
          the viewport, which produced a horizontal scrollbar. */}
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
          className="from-accent to-accent-strong absolute top-1/4 -left-32 h-64 w-64 rounded-full bg-gradient-to-r opacity-30 blur-3xl"
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
          className="absolute -right-32 bottom-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 opacity-30 blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
            className="mb-6 inline-block rounded-full bg-gradient-to-r from-orange-500 to-orange-600 p-3 shadow-lg sm:p-4"
          >
            <Mail className="h-9 w-9 text-white sm:h-12 sm:w-12" />
          </motion.div>

          <h1 className="text-fg-strong mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">
            Let&apos;s Connect
          </h1>

          <p className="text-muted mx-auto max-w-2xl text-base sm:text-lg md:text-xl">
            Feel free to reach out through any of these channels. I&apos;d love
            to hear from you!
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
        >
          {/* Phone Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="group bg-surface ring-border relative overflow-hidden rounded-2xl p-6 shadow-xl ring-1 transition-shadow hover:shadow-2xl sm:p-8"
          >
            <div className="from-accent/30 to-accent/10 absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br opacity-50 blur-2xl transition-all group-hover:scale-150" />

            <div className="relative">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-block rounded-full bg-gradient-to-r from-green-500 to-green-600 p-4 shadow-lg"
              >
                <Phone className="h-8 w-8 text-white" />
              </motion.div>

              <h3 className="text-fg-strong mb-2 text-xl font-bold">Phone</h3>

              <p className="text-accent mb-4 text-xl font-semibold sm:text-2xl">
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
                  className="bg-surface hover:bg-surface-hover cursor-pointer rounded-lg border-2 border-green-500 px-4 py-3 text-green-600 transition-all"
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
            className="group bg-surface ring-border relative overflow-hidden rounded-2xl p-6 shadow-xl ring-1 transition-shadow hover:shadow-2xl sm:p-8"
          >
            <div className="from-accent/30 to-accent/10 absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br opacity-50 blur-2xl transition-all group-hover:scale-150" />

            <div className="relative">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-block rounded-full bg-gradient-to-r from-orange-500 to-orange-600 p-4 shadow-lg"
              >
                <Mail className="h-8 w-8 text-white" />
              </motion.div>

              <h3 className="text-fg-strong mb-2 text-xl font-bold">Email</h3>

              <p className="text-accent mb-4 text-base font-semibold break-all sm:text-lg">
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
                  className="bg-surface text-accent hover:bg-accent-soft cursor-pointer rounded-lg border-2 border-orange-500 px-4 py-3 transition-all"
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
            className="group bg-surface ring-border relative overflow-hidden rounded-2xl p-6 shadow-xl ring-1 transition-shadow hover:shadow-2xl sm:p-8"
          >
            <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 opacity-50 blur-2xl transition-all group-hover:scale-150" />

            <div className="relative">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-block rounded-full bg-gradient-to-r from-blue-600 to-blue-700 p-4 shadow-lg"
              >
                <Linkedin className="h-8 w-8 text-white" />
              </motion.div>

              <h3 className="text-fg-strong mb-2 text-xl font-bold">
                LinkedIn
              </h3>

              <p className="text-muted mb-4 text-sm">
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
                  onClick={() =>
                    copyToClipboard(contactInfo.linkedin, 'linkedin')
                  }
                  className="bg-surface text-accent hover:bg-surface-hover cursor-pointer rounded-lg border-2 border-blue-600 px-4 py-3 transition-all"
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
      </div>
    </div>
  );
}
