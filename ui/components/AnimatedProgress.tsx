import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface AnimatedProgressProps {
  value: number; // 0-100
  label?: string;
  color?: "pink" | "purple" | "rose";
  size?: "sm" | "md" | "lg";
  showPercentage?: boolean;
}

export function AnimatedProgress({ 
  value, 
  label, 
  color = "pink", 
  size = "md",
  showPercentage = true 
}: AnimatedProgressProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  const colorClasses = {
    pink: "from-pink-400 to-pink-600",
    purple: "from-purple-400 to-purple-600",
    rose: "from-rose-400 to-rose-600"
  };

  const heightClasses = {
    sm: "h-2",
    md: "h-3", 
    lg: "h-4"
  };

  return (
    <div className="w-full">
      {label && (
        <motion.div 
          className="flex justify-between items-center mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-sm text-gray-600">{label}</span>
          {showPercentage && (
            <motion.span 
              className="text-sm font-medium text-gray-700"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              {Math.round(displayValue)}%
            </motion.span>
          )}
        </motion.div>
      )}
      
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${heightClasses[size]}`}>
        <motion.div
          className={`${heightClasses[size]} bg-gradient-to-r ${colorClasses[color]} rounded-full relative overflow-hidden`}
          initial={{ width: 0 }}
          animate={{ width: `${displayValue}%` }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
            delay: 0.2
          }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ["-100%", "100%"]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "linear"
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}