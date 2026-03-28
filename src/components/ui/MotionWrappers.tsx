import { motion, HTMLMotionProps } from 'motion/react';
import { ReactNode } from 'react';

interface FadeUpProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
  duration?: number;
}

export const FadeUp = ({ children, delay = 0, duration = 0.8, ...props }: FadeUpProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ delay, duration, ease: [0.4, 0, 0.2, 1] }}
    {...props}
  >
    {children}
  </motion.div>
);

export const StaggerContainer = ({ children, delay = 0, ...props }: { children: ReactNode; delay?: number } & HTMLMotionProps<'div'>) => (
  <motion.div
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, margin: "-100px" }}
    variants={{
      animate: {
        transition: {
          staggerChildren: 0.1,
          delayChildren: delay,
        },
      },
    }}
    {...props}
  >
    {children}
  </motion.div>
);
