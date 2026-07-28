'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '/resume', label: 'Resume' },
  { href: '/projects', label: 'Projects' },
  { href: '/learnings', label: 'Learnings' },
  { href: '/about', label: 'About me' },
  { href: '/contact', label: 'Contact Me' },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <motion.button
        onClick={toggleMenu}
        className="text-fg-strong hover:bg-surface-2 rounded-lg p-2 transition-all active:scale-90"
        aria-label="Toggle menu"
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.div>
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-16 z-40 bg-black/20 backdrop-blur-sm sm:top-20"
              onClick={toggleMenu}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-surface fixed top-16 right-0 left-0 z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto shadow-2xl sm:top-20 sm:max-h-[calc(100dvh-5rem)]"
            >
              <nav className="flex flex-col gap-1 p-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={toggleMenu}
                      className={cn(
                        'group relative block overflow-hidden rounded-lg px-4 py-3 text-base font-medium transition-all active:scale-95',
                        pathname === link.href
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                          : 'text-fg hover:bg-surface-2 hover:text-accent'
                      )}
                    >
                      <span className="relative z-10">{link.label}</span>
                      {pathname !== link.href && (
                        <span className="bg-accent-soft absolute inset-0 -z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
