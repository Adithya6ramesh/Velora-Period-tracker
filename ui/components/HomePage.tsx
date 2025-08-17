import { useState } from "react";
import { motion } from "motion/react";
import { EnhancedPeriodCalendar } from "./EnhancedPeriodCalendar";
import { PeriodLogModal } from "./PeriodLogModal";
import { Button } from "./ui/button";

export function HomePage() {
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsLogModalOpen(true);
  };

  const handleLogPeriod = () => {
    setSelectedDate(new Date());
    setIsLogModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10">
      {/* Tagline */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl text-gray-700 mb-4 tracking-wide italic font-amaze font-light">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Your cycle,
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="block"
          >
            your rhythm,
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="block"
          >
            your peace.
          </motion.span>
        </h1>
      </motion.div>

      {/* Calendar Widget */}
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-pink-100/50 hover:shadow-2xl transition-shadow duration-500">
          <EnhancedPeriodCalendar onDateClick={handleDateClick} />
        </div>
      </motion.div>

      {/* Log My Period Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <Button
          onClick={handleLogPeriod}
          className="px-8 py-4 bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
          size="lg"
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            + Log My Period
          </motion.span>
        </Button>
      </motion.div>

      {/* Period Log Modal */}
      <PeriodLogModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        selectedDate={selectedDate}
      />
    </div>
  );
}