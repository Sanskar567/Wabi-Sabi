import { motion } from "motion/react";
import { ReactNode } from "react";

interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

export const FadeUp = ({ children, className, delay = 0, duration = 0.8 }: MotionWrapperProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ 
      duration, 
      delay, 
      ease: [0.4, 0, 0.2, 1] 
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const FadeIn = ({ children, className, delay = 0, duration = 0.8 }: MotionWrapperProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration, delay, ease: "easeInOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export const ScaleIn = ({ children, className, delay = 0, duration = 0.6 }: MotionWrapperProps) => (
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerContainer = ({ children, className, delay = 0 }: { children: ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
    variants={{
      animate: {
        transition: {
          staggerChildren: 0.15,
          delayChildren: delay
        }
      }
    }}
    className={className}
  >
    {children}
  </motion.div>
);
