import { motion } from 'motion/react';
import logoImage from '../../assets/image.png';

export default function Footer3DLogo() {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{
          rotateY: [0, 360],
          rotateX: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="relative h-16 w-16"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front face — real logo */}
        <div
          className="absolute inset-0 overflow-hidden rounded-xl shadow-lg shadow-[#0A84FF]/50 ring-1 ring-[#0A84FF]/40"
          style={{ transform: 'translateZ(8px)' }}
        >
          <img
            src={logoImage}
            alt=""
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
        </div>

        {/* Back face — brand gradient */}
        <div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#0A84FF] via-[#A259FF] to-[#00E5FF] opacity-80"
          style={{ transform: 'translateZ(-8px) rotateY(180deg)' }}
        />
      </motion.div>
    </div>
  );
}