'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Loader2 } from 'lucide-react';

export default function ResumePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadResume = async () => {
    try {
      setIsDownloading(true);

      const response = await fetch('/api/resume/download');

      if (!response.ok) {
        throw new Error('Failed to download resume');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'Jalaj_Sharma_Resume.pdf';
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-bg min-h-screen pt-24 pb-20 sm:pt-28 lg:pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row"
        >
          <div>
            <h1 className="text-fg-strong text-3xl font-bold sm:text-4xl">
              My <span className="text-accent">Resume</span>
            </h1>
            <p className="text-muted mt-2 text-sm sm:text-base">
              View and download my professional resume
            </p>
          </div>

          <motion.button
            onClick={handleDownloadResume}
            disabled={isDownloading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDownloading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                <span>Download PDF</span>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* PDF Viewer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-surface ring-border relative overflow-hidden rounded-2xl shadow-2xl ring-1"
        >
          {isLoading && (
            <div className="bg-surface-2 absolute inset-0 z-10 hidden items-center justify-center sm:flex">
              <div className="text-center">
                <Loader2 className="text-accent mx-auto h-12 w-12 animate-spin" />
                <p className="text-muted mt-4">Loading resume...</p>
              </div>
            </div>
          )}

          {/* Inline PDF viewing is unreliable on mobile browsers, so the
              embed is desktop-only and small screens get a download prompt. */}
          <iframe
            src="/documents/Jalaj_Sharma_Resume.pdf"
            className="hidden h-[calc(100dvh-240px)] min-h-[520px] w-full sm:block"
            onLoad={() => setIsLoading(false)}
            title="Jalaj Sharma Resume"
          />

          <div className="flex flex-col items-center gap-4 px-6 py-14 text-center sm:hidden">
            <div className="bg-accent-soft rounded-full p-4">
              <Download className="text-accent h-7 w-7" />
            </div>
            <div>
              <h2 className="text-fg-strong text-base font-semibold">
                View on a bigger screen
              </h2>
              <p className="text-muted mt-1 text-sm">
                Inline PDF preview isn&apos;t supported on most mobile browsers.
                Download the resume to read it here.
              </p>
            </div>
            <button
              onClick={handleDownloadResume}
              disabled={isDownloading}
              className="rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isDownloading ? 'Downloading...' : 'Download PDF'}
            </button>
          </div>
        </motion.div>

        {/* Alternative Download Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-muted mt-6 text-center text-sm"
        >
          Having trouble viewing?{' '}
          <button
            onClick={handleDownloadResume}
            className="text-accent hover:text-accent font-semibold hover:underline"
          >
            Download the PDF directly
          </button>
        </motion.div>
      </div>
    </div>
  );
}
