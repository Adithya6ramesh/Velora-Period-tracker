import { motion } from "motion/react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "pink" | "purple" | "rose";
}

export function LoadingSpinner({ size = "md", color = "pink" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  const colorClasses = {
    pink: "border-pink-500",
    purple: "border-purple-500", 
    rose: "border-rose-500"
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizeClasses[size]} border-2 ${colorClasses[color]} border-t-transparent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Floating dots around spinner */}
      <div className="absolute">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 ${colorClasses[color].replace('border', 'bg')} rounded-full`}
            style={{
              left: "50%",
              top: "50%",
              transformOrigin: `0 ${size === 'sm' ? '12px' : size === 'md' ? '20px' : '28px'}`
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}