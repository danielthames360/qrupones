'use client';

import { motion } from 'framer-motion';

export default function template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 360,
        damping: 20,
      }}>
      {children}
    </motion.div>
  );
}
