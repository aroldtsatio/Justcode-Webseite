import { motion } from 'motion/react';

const splineRobotUrl =
  'https://my.spline.design/nexbotrobotcharacterconcept-3UOev9CTQjtiIlQbuiVPMRwK/';

export default function HeroSplineRobot() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 36, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: 0.45, duration: 0.9, ease: 'easeOut' }}
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      aria-hidden="true"
    >
      <div className="relative h-full w-full">
        <iframe
          title="NEXBOT robot character concept"
          src={splineRobotUrl}
          className="absolute left-1/2 top-1/2 h-[122%] w-[140%] -translate-x-1/2 -translate-y-1/2 border-0 opacity-65 sm:w-[130%] sm:opacity-72 lg:h-[128%] lg:w-[120%] lg:opacity-82 xl:opacity-90"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          loading="eager"
          tabIndex={-1}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(0,212,255,0.08),transparent_34%),linear-gradient(90deg,rgba(7,26,82,0.86)_0%,rgba(7,26,82,0.48)_42%,rgba(7,26,82,0.12)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#071A52] via-[#071A52]/72 to-transparent" />
      </div>
    </motion.div>
  );
}
