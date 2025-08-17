import { useState } from "react";
import { motion } from "framer-motion";
import { EnhancedPeriodCalendar } from "./EnhancedPeriodCalendar";
import { Button } from "./ui/button";
import { Toast } from "./ui/toast";

export function HomePage() {
  const [showToast, setShowToast] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set());

  const formatDateKey = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const dateKey = formatDateKey(date);
    const newSelectedDates = new Set(selectedDates);
    
    if (selectedDates.has(dateKey)) {
      // If the date is already selected, remove it and the following 6 days
      for (let i = 0; i < 7; i++) {
        const nextDate = new Date(date);
        nextDate.setDate(date.getDate() + i);
        const nextDateKey = formatDateKey(nextDate);
        newSelectedDates.delete(nextDateKey);
      }
    } else {
      // If the date is not selected, add it and the following 6 days
      for (let i = 0; i < 7; i++) {
        const nextDate = new Date(date);
        nextDate.setDate(date.getDate() + i);
        const nextDateKey = formatDateKey(nextDate);
        newSelectedDates.add(nextDateKey);
      }
    }
    
    setSelectedDates(newSelectedDates);
    setShowToast(true);
  };

  const handleLogPeriod = () => {
    const today = new Date();
    setSelectedDate(today);
    handleDateClick(today);
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
        <h1 className="text-4xl md:text-5xl text-gray-700 mb-4 tracking-wide font-amaze font-light">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Your <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Cycle</span>.{" "}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            Your <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Rhythm</span>.{" "}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            Your <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Peace</span>.
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
          <EnhancedPeriodCalendar 
            onDateClick={handleDateClick}
            selectedDates={selectedDates}
          />
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

      {/* Success Toast */}
      <Toast
        message={`Successfully logged period for ${selectedDate?.toLocaleDateString() || 'today'}`}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
