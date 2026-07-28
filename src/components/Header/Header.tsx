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
      // Always keep a translucent backdrop. A fully transparent header let page
      // content scroll visibly underneath the logo and nav.
      className={`fixed top-0 right-0 left-0 z-50 backdrop-blur-md transition-all duration-300 ${
        isScrolled
          ? 'border-border bg-bg/90 border-b shadow-lg shadow-black/5'
          : 'bg-bg/70 border-b border-transparent'
      }`}
    >
      {/* Height is fixed (h-16 / sm:h-20) so MobileMenu can anchor its panel
          to the exact bottom edge of the header. Keep the two in sync. */}
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
        {/* Left Side - Name/Logo */}
        <Link href="/" className="group relative shrink-0">
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-fg-strong relative block text-base font-bold tracking-tight whitespace-nowrap transition-all sm:text-lg lg:text-xl"
          >
            <span className="relative inline-block">
              JALAJ SHARMA
              <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300 group-hover:w-full" />
            </span>
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="hidden items-center gap-3 lg:flex xl:gap-4"
        >
          <NavMenu />

          <Link
            href="/contact"
            className="group relative shrink-0 overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-sm font-medium whitespace-nowrap text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95 xl:px-7"
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
