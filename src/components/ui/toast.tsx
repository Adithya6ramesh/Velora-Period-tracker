import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, isVisible, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "50%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white px-6 py-4 rounded-lg shadow-lg border border-pink-100 z-50 flex items-center gap-3"
          onAnimationComplete={() => {
            setTimeout(onClose, 2000); // Auto close after 2 seconds
          }}
        >
          <div className="text-pink-500">✓</div>
          <p className="text-gray-700 font-medium">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
