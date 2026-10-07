import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';

export default function RobotShowcase() {
  const [ref, isInView] = useInView({ threshold: 0.18 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-b from-[#071A52] to-[#0A2470] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(0,212,255,0.11),transparent_34%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="max-w-xl"
        >
          <div className="mb-5 inline-flex items-center rounded-lg border border-[#00D4FF]/30 bg-[#00D4FF]/10 px-4 py-2 text-sm font-semibold text-[#00D4FF]">
            JUSTCODE Lab
          </div>
          <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Building playful tech, one experiment at a time.
          </h2>
          <p className="mt-5 text-base leading-7 text-white/68">
            A small local animation for the page: no external service, no extra tracking, just a bit of motion near the bottom.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="relative min-h-[30rem]"
        >
          <motion.div
            animate={{ y: [-14, 14, -14], rotate: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 opacity-85"
          >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.22),rgba(15,82,186,0.08)_42%,transparent_68%)] blur-2xl" />
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 34px rgba(0,212,255,0.22)',
                  '0 0 72px rgba(0,212,255,0.38)',
                  '0 0 34px rgba(0,212,255,0.22)',
                ],
              }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/2 top-[10%] h-[11rem] w-[14rem] -translate-x-1/2 rounded-[2rem] border border-[#00D4FF]/45 bg-[#071A52]/70 shadow-[0_28px_90px_rgba(0,212,255,0.18)] backdrop-blur-md"
            >
              <div className="absolute inset-3 rounded-[1.35rem] border border-white/12 bg-gradient-to-b from-white/12 to-white/4" />
              <div className="absolute left-1/2 top-[-2.7rem] h-11 w-1 -translate-x-1/2 bg-[#00D4FF]/65" />
              <motion.div
                animate={{ scale: [1, 1.18, 1], opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-1/2 top-[-3.35rem] h-5 w-5 -translate-x-1/2 rounded-full bg-[#00D4FF] shadow-[0_0_30px_rgba(0,212,255,0.9)]"
              />
              <div className="absolute left-[22%] top-[43%] h-8 w-8 rounded-full bg-[#00D4FF] shadow-[0_0_28px_rgba(0,212,255,0.9)]" />
              <div className="absolute right-[22%] top-[43%] h-8 w-8 rounded-full bg-[#00D4FF] shadow-[0_0_28px_rgba(0,212,255,0.9)]" />
              <motion.div
                animate={{ width: ['3.8rem', '5.2rem', '3.8rem'] }}
                transition={{ duration: 3.1, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-[24%] left-1/2 h-1.5 -translate-x-1/2 rounded-full bg-white/65"
              />
            </motion.div>

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/2 top-[34%] h-[15rem] w-[16rem] -translate-x-1/2 rounded-[2.5rem] border border-[#00D4FF]/35 bg-[#0A1D5A]/70 shadow-[0_32px_100px_rgba(2,11,46,0.42)] backdrop-blur-md"
            >
              <div className="absolute inset-x-8 top-7 h-12 rounded-xl border border-white/10 bg-white/8" />
              <div className="absolute left-1/2 top-24 grid w-28 -translate-x-1/2 grid-cols-3 gap-3">
                {[0, 1, 2, 3, 4, 5].map((dot) => (
                  <motion.span
                    key={dot}
                    animate={{ opacity: [0.35, 1, 0.35] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: dot * 0.18, ease: 'easeInOut' }}
                    className="h-3 w-3 rounded-full bg-[#00D4FF] shadow-[0_0_16px_rgba(0,212,255,0.8)]"
                  />
                ))}
              </div>
              <div className="absolute inset-x-10 bottom-7 h-2 rounded-full bg-gradient-to-r from-transparent via-[#00D4FF]/80 to-transparent" />
            </motion.div>

            <motion.div
              animate={{ rotate: [-8, 4, -8] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-[18%] top-[43%] h-36 w-10 origin-top rounded-full border border-[#00D4FF]/30 bg-[#0A1D5A]/65"
            />
            <motion.div
              animate={{ rotate: [8, -4, 8] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute right-[18%] top-[43%] h-36 w-10 origin-top rounded-full border border-[#00D4FF]/30 bg-[#0A1D5A]/65"
            />
            <div className="absolute left-[37%] top-[73%] h-28 w-9 rounded-full border border-[#00D4FF]/25 bg-[#071A52]/72" />
            <div className="absolute right-[37%] top-[73%] h-28 w-9 rounded-full border border-[#00D4FF]/25 bg-[#071A52]/72" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
