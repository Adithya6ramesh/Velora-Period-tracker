import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Button } from "./ui/button";

interface CalendarProps {
  onDateClick: (date: Date) => void;
}

export function EnhancedPeriodCalendar({ onDateClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 1)); // August 2025
  
  // Mock data matching the screenshot
  const periodDates = new Set([
    '2025-08-15', '2025-08-16', '2025-08-17', '2025-08-18'
  ]);
  
  const predictedDates = new Set([
    '2025-09-12', '2025-09-13', '2025-09-14', '2025-09-15'
  ]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day);
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = new Date().toDateString() === date.toDateString();
      
      let dayClass = "h-10 w-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 relative text-sm font-medium";
      
      if (isToday) {
        dayClass += " ring-2 ring-pink-400 ring-offset-2";
      }
      
      if (periodDates.has(dateKey)) {
        dayClass += " bg-red-400 text-white hover:bg-red-500 shadow-md";
      } else if (predictedDates.has(dateKey)) {
        dayClass += " bg-pink-100 text-pink-800 border-2 border-dashed border-pink-300 hover:bg-pink-200";
      } else {
        dayClass += " hover:bg-pink-50 text-gray-700";
      }

      days.push(
        <motion.div
          key={day}
          className={dayClass}
          onClick={() => onDateClick(date)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring" as const, stiffness: 300 }}
        >
          {day}
        </motion.div>
      );
    }

    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="w-full">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6 px-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={goToPreviousMonth} 
          className="text-pink-400 hover:text-pink-600 hover:bg-pink-50 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-medium text-pink-500">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex gap-1">
            <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
            <Heart className="w-4 h-4 text-pink-300 fill-pink-300" />
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={goToNextMonth} 
          className="text-pink-400 hover:text-pink-600 hover:bg-pink-50 rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div key={`day-${index}`} className="h-8 flex items-center justify-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2 mb-8">
        {renderCalendarDays()}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-400"></div>
          <span className="text-gray-600">Period start</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-pink-100 border-2 border-dashed border-pink-300"></div>
          <span className="text-gray-600">Period days</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
          <span className="text-gray-600">Predicted</span>
        </div>
      </div>
    </div>
  );
}
