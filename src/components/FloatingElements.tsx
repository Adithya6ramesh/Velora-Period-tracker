import { motion } from "framer-motion";

export function FloatingElements() {
  // Gentle flowing shapes
  const floatingShapeVariants = {
    float: {
      y: [-20, -40, -20],
      x: [-10, 10, -10],
      scale: [1, 1.1, 1]
    }
  };

  const transition = {
    duration: 12,
    repeat: Infinity,
    ease: "easeInOut"
  } as const;

  const floatingTransition = transition;
  const particleTransition = { ...transition, duration: 8 } as const;
  const blobTransition = { ...transition, duration: 20 } as const;

  // Soft particle dots
  const particleVariants = {
    float: {
      y: [-15, -25, -15],
      opacity: [0.3, 0.6, 0.3],
      scale: [0.8, 1, 0.8]
    }
  };

  // Morphing blob
  const blobVariants = {
    morph: {
      scale: [1, 1.2, 0.9, 1],
      rotate: [0, 90, 180, 360]
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft Gradient Background Mesh */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(252, 231, 243, 0.8) 0%, transparent 50%),
              radial-gradient(circle at 80% 60%, rgba(233, 213, 255, 0.6) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(254, 202, 202, 0.5) 0%, transparent 50%)
            `
          }}
        />
      </div>

      {/* Gentle Floating Shapes */}
      <motion.div
        variants={floatingShapeVariants}
        animate="float"
        className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full opacity-20"
        style={{
          background: "linear-gradient(135deg, rgba(251, 207, 232, 0.8) 0%, rgba(233, 213, 255, 0.6) 100%)",
          filter: "blur(20px)"
        }}
      />

      <motion.div
        variants={floatingShapeVariants}
        animate="float"
        transition={floatingTransition}
        className="absolute bottom-1/3 left-1/5 w-40 h-40 rounded-full opacity-15"
        style={{
          background: "linear-gradient(135deg, rgba(233, 213, 255, 0.7) 0%, rgba(252, 231, 243, 0.5) 100%)",
          filter: "blur(25px)",
          animationDelay: "3s"
        }}
      />

      <motion.div
        variants={floatingShapeVariants}
        animate="float"
        transition={floatingTransition}
        className="absolute top-1/2 left-1/2 w-28 h-28 rounded-full opacity-25"
        style={{
          background: "linear-gradient(135deg, rgba(254, 202, 202, 0.6) 0%, rgba(251, 207, 232, 0.4) 100%)",
          filter: "blur(15px)",
          animationDelay: "6s"
        }}
      />

      {/* Soft Particle Dots */}
      <motion.div
        variants={particleVariants}
        animate="float"
        transition={particleTransition}
        className="absolute top-1/6 left-1/3 w-2 h-2 bg-pink-200 rounded-full opacity-40"
        style={{ animationDelay: "1s" }}
      />

      <motion.div
        variants={particleVariants}
        animate="float"
        transition={particleTransition}
        className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-purple-200 rounded-full opacity-50"
        style={{ animationDelay: "4s" }}
      />

      <motion.div
        variants={particleVariants}
        animate="float"
        transition={particleTransition}
        className="absolute bottom-1/4 left-2/3 w-3 h-3 bg-rose-200 rounded-full opacity-30"
        style={{ animationDelay: "7s" }}
      />

      <motion.div
        variants={particleVariants}
        animate="float"
        transition={particleTransition}
        className="absolute top-3/4 left-1/6 w-1 h-1 bg-pink-300 rounded-full opacity-60"
        style={{ animationDelay: "2s" }}
      />

      <motion.div
        variants={particleVariants}
        animate="float"
        transition={particleTransition}
        className="absolute top-1/3 right-1/6 w-2.5 h-2.5 bg-purple-100 rounded-full opacity-35"
        style={{ animationDelay: "5s" }}
      />

      {/* Morphing Blob */}
      <motion.div
        variants={blobVariants}
        animate="morph"
        transition={blobTransition}
        className="absolute top-1/2 right-1/3 w-24 h-24 opacity-20"
        style={{
          background: "linear-gradient(45deg, rgba(251, 207, 232, 0.6), rgba(233, 213, 255, 0.4))",
          borderRadius: "30% 70% 60% 40%",
          filter: "blur(12px)"
        }}
      />

      {/* Subtle Wave Effect */}
      <div className="absolute bottom-0 left-0 w-full h-32 opacity-20">
        <motion.div
          className="w-full h-full"
          style={{
            background: "linear-gradient(to right, rgba(251, 207, 232, 0.3), rgba(233, 213, 255, 0.2), rgba(254, 202, 202, 0.3))",
            borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
            transform: "scaleX(1.5)"
          }}
          animate={{
            y: [0, -10, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Breathing Light Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(252, 231, 243, 0.5) 0%, transparent 70%)"
        }}
      />
    </div>
  );
}
