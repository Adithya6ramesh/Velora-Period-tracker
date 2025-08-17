import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, AlertCircle, Info, Heart } from "lucide-react";
import { useState, useEffect } from "react";

interface NotificationProps {
  message: string;
  type?: "success" | "error" | "info" | "heart";
  duration?: number;
  onClose?: () => void;
  show: boolean;
}

export function FloatingNotification({ 
  message, 
  type = "info", 
  duration = 4000, 
  onClose,
  show 
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    heart: Heart
  };

  const colors = {
    success: "from-green-400 to-emerald-500 text-white",
    error: "from-red-400 to-rose-500 text-white",
    info: "from-blue-400 to-cyan-500 text-white",
    heart: "from-pink-400 to-rose-500 text-white"
  };

  const Icon = icons[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.3 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
          className="fixed top-4 right-4 z-50"
        >
          <motion.div
            className={`bg-gradient-to-r ${colors[type]} rounded-2xl shadow-2xl p-4 pr-12 max-w-sm backdrop-blur-md border border-white/20`}
            whileHover={{ scale: 1.05 }}
            layout
          >
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Icon className="w-5 h-5" />
              </motion.div>
              
              <motion.p
                className="font-medium"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {message}
              </motion.p>
            </div>
            
            <motion.button
              onClick={() => {
                setIsVisible(false);
                onClose?.();
              }}
              className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <X className="w-4 h-4" />
            </motion.button>

            {/* Progress bar */}
            {duration > 0 && (
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-2xl"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: duration / 1000, ease: "linear" }}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}