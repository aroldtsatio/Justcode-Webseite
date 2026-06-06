import { motion } from 'motion/react';

export default function Footer3DLogo() {
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ perspective: '1000px' }}>
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
        className="w-16 h-16 relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#0F52BA] to-[#00D4FF] rounded-lg shadow-lg shadow-[#00D4FF]/50"
          style={{ transform: 'translateZ(8px)' }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">JC</span>
          </div>
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#00D4FF] to-[#0F52BA] rounded-lg opacity-50"
          style={{ transform: 'translateZ(-8px) rotateY(180deg)' }}
        />
      </motion.div>
    </div>
  );
}
