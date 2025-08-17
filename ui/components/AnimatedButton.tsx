import { motion } from "motion/react";
import { ReactNode } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}

export function AnimatedButton({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "md", 
  className = "",
  disabled = false 
}: AnimatedButtonProps) {
  const baseClasses = "rounded-full font-medium transition-all duration-300 relative overflow-hidden";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-white/80 backdrop-blur-md border border-pink-200 text-pink-700 hover:bg-pink-50 shadow-md hover:shadow-lg",
    ghost: "text-pink-600 hover:text-pink-700 hover:bg-pink-50 rounded-full"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      whileHover={!disabled ? { 
        scale: 1.05,
        y: -2
      } : {}}
      whileTap={!disabled ? { 
        scale: 0.95,
        y: 0
      } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
    >
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={{ scale: 0, opacity: 0.5 }}
        whileTap={{
          scale: 1,
          opacity: 0,
          transition: { duration: 0.6 }
        }}
        style={{
          background: variant === "primary" 
            ? "rgba(255, 255, 255, 0.3)" 
            : "rgba(236, 72, 153, 0.2)"
        }}
      />
      
      {/* Content */}
      <motion.span
        className="relative z-10 flex items-center justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}