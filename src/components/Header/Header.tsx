'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import NavMenu from './NavMenu';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        {/* Left Side - Name/Logo */}
        <Link
          href="/"
          className="group relative flex flex-col"
        >
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative text-lg font-bold tracking-tight text-gray-900 transition-all sm:text-xl"
          >
            <span className="relative inline-block">
              JALAJ
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300 group-hover:w-full" />
            </span>
          </motion.span>
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative text-lg font-bold tracking-tight text-gray-900 transition-all sm:text-xl"
          >
            <span className="relative inline-block">
              SHARMA
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300 group-hover:w-full" />
            </span>
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="hidden items-center gap-4 lg:flex"
        >
          <NavMenu />

          <Link
            href="/contact"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95 sm:px-8"
          >
            <span className="relative z-10">Contact Me</span>
            <span className="absolute inset-0 -z-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
        </motion.div>

        {/* Mobile Menu */}
        <MobileMenu />
      </nav>
    </motion.header>
  );
}
