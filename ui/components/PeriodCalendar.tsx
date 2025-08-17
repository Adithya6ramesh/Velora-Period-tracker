import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface CalendarProps {
  onDateClick: (date: Date) => void;
}

export function PeriodCalendar({ onDateClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Mock data for demonstration
  const periodDates = new Set([
    '2024-12-15', '2024-12-16', '2024-12-17', '2024-12-18', '2024-12-19',
    '2024-11-18', '2024-11-19', '2024-11-20', '2024-11-21'
  ]);
  
  const predictedDates = new Set([
    '2025-01-16', '2025-01-17', '2025-01-18', '2025-01-19', '2025-01-20'
  ]);
  
  const ovulationDates = new Set([
    '2024-12-02', '2024-11-05', '2025-01-02'
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
      
      let dayClass = "h-10 w-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-50 transition-colors relative";
      
      if (isToday) {
        dayClass += " ring-2 ring-pink-300";
      }
      
      if (periodDates.has(dateKey)) {
        dayClass += " bg-red-400 text-white hover:bg-red-500";
      } else if (predictedDates.has(dateKey)) {
        dayClass += " bg-pink-200 text-pink-800 border-2 border-dashed border-pink-300";
      } else if (ovulationDates.has(dateKey)) {
        dayClass += " bg-yellow-300 text-yellow-800";
      }

      days.push(
        <div
          key={day}
          className={dayClass}
          onClick={() => onDateClick(date)}
        >
          {day}
        </div>
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
    <Card className="p-6 shadow-lg border-pink-100">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="sm" onClick={goToPreviousMonth} className="text-pink-600 hover:text-pink-700 hover:bg-pink-50">
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-lg font-medium text-gray-800">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <Button variant="ghost" size="sm" onClick={goToNextMonth} className="text-pink-600 hover:text-pink-700 hover:bg-pink-50">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 mb-6">
        {renderCalendarDays()}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-400"></div>
          <span className="text-gray-600">Period</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-pink-200 border-2 border-dashed border-pink-300"></div>
          <span className="text-gray-600">Predicted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-yellow-300"></div>
          <span className="text-gray-600">Ovulation</span>
        </div>
      </div>
    </Card>
  );
}