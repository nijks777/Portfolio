'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
  Download,
  FileText,
  FolderKanban,
  User,
  GraduationCap,
} from 'lucide-react';
import EmailModal from '@/components/EmailModal';

interface NavLink {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const navLinks: NavLink[] = [
  { href: '/resume', label: 'Resume', icon: FileText },
  { href: '/projects', label: 'Projects', icon: FolderKanban },
  { href: '/learnings', label: 'Learnings', icon: GraduationCap },
  { href: '/about', label: 'About me', icon: User },
];

export default function NavMenu() {
  const pathname = usePathname();
  const [showResumeButtons, setShowResumeButtons] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const handleSendResume = async (email: string) => {
    const response = await fetch('/api/resume/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send resume');
    }

    // Close the resume dropdown after successful email send
    setShowResumeButtons(false);

    // Show success message
    alert('Request received! Your resume will be sent shortly.');
  };

  const handleDownloadResume = async () => {
    try {
      setIsDownloading(true);

      const response = await fetch('/api/resume/download');

      if (!response.ok) {
        throw new Error('Failed to download resume');
      }

      // Get the blob from the response
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Jalaj_Sharma_Resume.pdf';
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Close the dropdown after successful download
      setShowResumeButtons(false);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <div className="bg-surface ring-border flex items-center gap-5 rounded-full px-6 py-2.5 shadow-lg ring-1 transition-shadow hover:shadow-xl xl:gap-6 xl:px-8">
        {navLinks.map((link, index) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
            // flex (not the default block) so every item's box is exactly its
            // content height. As inline elements, the <button> and <a> sat on
            // their own text baselines and reserved descender space, which left
            // Resume sitting higher than its neighbours.
            className="relative flex items-center"
          >
            {link.label === 'Resume' ? (
              <div
                className="relative flex items-center"
                onMouseEnter={() => setShowResumeButtons(true)}
                onMouseLeave={() => setShowResumeButtons(false)}
              >
                <button
                  onClick={() => setShowResumeButtons(!showResumeButtons)}
                  className={cn(
                    'group relative flex cursor-pointer items-center text-sm font-medium transition-all active:scale-95',
                    pathname === link.href
                      ? 'text-accent font-semibold'
                      : 'text-fg hover:text-fg-strong'
                  )}
                >
                  <span className="relative flex items-center gap-1.5">
                    {link.icon && (
                      <motion.div
                        whileHover={{ y: -2 }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <link.icon className="h-4 w-4" />
                      </motion.div>
                    )}
                    {link.label}
                    {pathname === link.href ? (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-orange-500 to-orange-600"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    ) : (
                      <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300 group-hover:w-full" />
                    )}
                  </span>
                </button>

                <AnimatePresence>
                  {showResumeButtons && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      // pt-3 is a transparent hover bridge. With mt-2 the gap
                      // between trigger and panel was a dead zone, so moving the
                      // pointer down fired onMouseLeave and closed the dropdown.
                      className="absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3"
                    >
                      <div className="bg-surface ring-border flex flex-col gap-2 rounded-lg p-3 shadow-xl ring-1">
                        {/* View Resume Button */}
                        <a
                          href="/resume"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setShowResumeButtons(false)}
                          className="group relative cursor-pointer overflow-hidden rounded-md bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-sm font-medium whitespace-nowrap text-white shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95"
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            <motion.div
                              animate={{
                                scale: [1, 1.1, 1],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                            >
                              <FileText className="h-4 w-4" />
                            </motion.div>
                            View Resume
                          </span>
                          <span className="absolute inset-0 -z-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </a>

                        {/* Download Resume Button */}
                        <button
                          onClick={handleDownloadResume}
                          disabled={isDownloading}
                          className={cn(
                            'group bg-surface text-accent hover:bg-accent-soft relative cursor-pointer overflow-hidden rounded-md border-2 border-orange-500 px-4 py-2 text-sm font-medium whitespace-nowrap shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95',
                            isDownloading &&
                              'cursor-not-allowed opacity-50 hover:scale-100'
                          )}
                        >
                          <span className="flex items-center gap-2">
                            <motion.div
                              animate={
                                isDownloading
                                  ? {
                                      y: [0, -5, 0],
                                      scale: [1, 1.1, 1],
                                    }
                                  : {
                                      y: [0, -3, 0],
                                    }
                              }
                              transition={{
                                duration: isDownloading ? 0.6 : 1.2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                            >
                              <Download className="h-4 w-4" />
                            </motion.div>
                            {isDownloading
                              ? 'Downloading...'
                              : 'Download Resume'}
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href={link.href}
                className={cn(
                  'group relative flex items-center text-sm font-medium transition-all active:scale-95',
                  pathname === link.href
                    ? 'text-accent font-semibold'
                    : 'text-fg hover:text-fg-strong'
                )}
              >
                <span className="relative flex items-center gap-1.5">
                  {link.icon && (
                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <link.icon className="h-4 w-4" />
                    </motion.div>
                  )}
                  {link.label}
                  {pathname === link.href ? (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-orange-500 to-orange-600"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  ) : (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300 group-hover:w-full" />
                  )}
                </span>
              </Link>
            )}
          </motion.div>
        ))}
      </div>

      {/* Email Modal - Rendered outside to prevent positioning issues */}
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onSubmit={handleSendResume}
      />
    </>
  );
}
