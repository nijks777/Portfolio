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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20 pt-32">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              My <span className="text-orange-600">Resume</span>
            </h1>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">View and download my professional resume</p>
          </div>

          <motion.button
            onClick={handleDownloadResume}
            disabled={isDownloading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
          className="relative overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200"
        >
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-orange-600" />
                <p className="mt-4 text-gray-600">Loading resume...</p>
              </div>
            </div>
          )}

          <iframe
            src="/documents/Jalaj_Sharma_Resume.pdf"
            className="h-[calc(100vh-200px)] w-full"
            onLoad={() => setIsLoading(false)}
            title="Jalaj Sharma Resume"
          />
        </motion.div>

        {/* Alternative Download Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 text-center text-sm text-gray-600"
        >
          Having trouble viewing?{' '}
          <button
            onClick={handleDownloadResume}
            className="font-semibold text-orange-600 hover:text-orange-700 hover:underline"
          >
            Download the PDF directly
          </button>
        </motion.div>
      </div>
    </div>
  );
}
