import { motion } from 'motion/react';

interface WordRevealProps {
  text: string;
  staggerDelay?: number;
  duration?: number;
  className?: string;
}

/**
 * WordReveal — animates text word by word with a slide-up entrance.
 * Use inside AnimatePresence to get exit animations on tab switches.
 */
export default function WordReveal({
  text,
  staggerDelay = 0.04,
  duration = 0.5,
  className = '',
}: WordRevealProps) {
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            delay: i * staggerDelay,
            duration,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mr-[0.25em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}