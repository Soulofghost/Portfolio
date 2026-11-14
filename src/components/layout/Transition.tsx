'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Transition() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Unmount completely after animation to guarantee zero scroll or event interference
    const timer = setTimeout(() => {
      setVisible(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full h-full bg-[#080c14]"
        />
      </div>
    </AnimatePresence>
  );
}
