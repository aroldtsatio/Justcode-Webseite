import { motion } from 'motion/react';
import logoImage from '../../assets/image.png';

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
          className="absolute inset-0 overflow-hidden rounded-xl shadow-lg shadow-[#00D4FF]/50 ring-1 ring-[#00D4FF]/35"
          style={{ transform: 'translateZ(8px)' }}
        >
          <img src={logoImage} alt="JUSTCODE-KL" className="w-full h-full object-cover" />
        </div>
        <div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#0F52BA] to-[#00D4FF] opacity-60"
          style={{ transform: 'translateZ(-8px) rotateY(180deg)' }}
        />
      </motion.div>
    </div>
  );
}
