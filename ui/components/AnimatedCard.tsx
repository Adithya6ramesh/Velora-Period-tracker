import { motion } from "motion/react";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export function AnimatedCard({ 
  children, 
  className = "", 
  delay = 0,
  hover = true 
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay
      }}
      whileHover={hover ? {
        y: -5,
        scale: 1.02,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 25
        }
      } : {}}
      className={`bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-pink-100/50 hover:shadow-2xl transition-shadow duration-500 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}