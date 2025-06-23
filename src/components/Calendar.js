import React, { useState } from 'react';
import { PeriodTracker } from '../utils/periodTracker';

const Calendar = ({ periodDates = [], onDateClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getDateString = (day) => {
    return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isPeriodStartDay = (day) => {
    if (!day) return false;
    const dateString = getDateString(day);
    return periodDates.includes(dateString);
  };

  const isPeriodDay = (day) => {
    if (!day) return false;
    const dateString = getDateString(day);
    const allPeriodDates = PeriodTracker.getAllPeriodDates(periodDates);
    return allPeriodDates.includes(dateString);
  };

  const isPredictedPeriodDay = (day) => {
    if (!day) return false;
    const dateString = getDateString(day);
    const predictedDates = PeriodTracker.getPredictedPeriodDates(periodDates);
    return predictedDates.includes(dateString);
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 max-w-md mx-auto">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigateMonth(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <span className="text-pink-400 text-xl">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
          <div className="flex items-center gap-1">
            <svg className="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <svg className="w-8 h-8 text-pink-400 transform rotate-12" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
        </h2>
        
        <button 
          onClick={() => navigateMonth(1)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-center text-gray-600 font-medium py-2 text-sm">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isPeriodStarted = isPeriodStartDay(day);
          const isPeriodActive = isPeriodDay(day);
          const isPredicted = isPredictedPeriodDay(day);
          
          return (
            <div key={index} className="aspect-square flex items-center justify-center">
              {day && (
                <div
                  onClick={() => onDateClick && onDateClick(getDateString(day))}
                  className={`
                    w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer
                    transition-colors duration-200 relative hover:scale-105
                    ${isPeriodStarted 
                      ? 'bg-red-500 text-white font-bold ring-2 ring-red-300' 
                      : isPeriodActive
                      ? 'bg-pink-400 text-white font-bold'
                      : isPredicted
                      ? 'bg-pink-50 text-pink-600 border-2 border-pink-200 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  {day}
                  {isPeriodStarted && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full border border-white"></div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex justify-center gap-8 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500 rounded ring-1 ring-red-300"></div>
          <span className="text-gray-600">Period start</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-pink-400 rounded"></div>
          <span className="text-gray-600">Period days</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-pink-50 rounded border-2 border-pink-200"></div>
          <span className="text-gray-600">Predicted</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar; 