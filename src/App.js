import React, { useState } from 'react';
import Calendar from './components/Calendar';
import { ToastContainer, toast } from 'react-toastify';
import { PeriodTracker } from './utils/periodTracker';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    // Start with realistic sample data (28-30 day cycles)
  const [periodDates, setPeriodDates] = useState([
    '2024-05-01', '2024-05-29', '2024-06-26'
  ]);

  const handleLogPeriod = () => {
    const today = new Date().toISOString().split('T')[0];
    handleDateClick(today);
  };

  const handleDateClick = (dateString) => {
    if (periodDates.includes(dateString)) {
      // Show confirmation to undo
      if (window.confirm('This date is already logged. Do you want to undo?')) {
        setPeriodDates(prev => prev.filter(date => date !== dateString));
        toast.success('Period log removed!');
      }
    } else {
      // Add new period start date
      setPeriodDates(prev => [...prev, dateString].sort());
      toast.success('✅ Period logged! Predictions updated for the next 7 days.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300">
      {/* Header */}
      <header className="flex justify-between items-center p-6 text-gray-700">
        <div className="flex space-x-8">
          <button className="hover:text-purple-600 transition-colors">Analysis</button>
          <button className="hover:text-purple-600 transition-colors font-semibold text-lg">Velora</button>
          <button className="hover:text-purple-600 transition-colors">Sign in</button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center px-6">
        {/* Tagline */}
        <h1 className="text-4xl md:text-5xl font-handwriting text-gray-700 text-center mb-12 max-w-4xl">
          Your cycle, your rhythm, your peace.
        </h1>

        {/* Calendar Container */}
        <div className="relative">
          <Calendar periodDates={periodDates} onDateClick={handleDateClick} />
          
          {/* Log Period Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLogPeriod}
              className="bg-pink-400 hover:bg-pink-500 text-white font-medium px-8 py-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              + Log My Period
            </button>
          </div>
        </div>

        {/* Decorative Butterflies */}
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 space-y-8 hidden lg:block">
          <div className="w-16 h-16 opacity-60">
            <svg viewBox="0 0 100 100" className="w-full h-full text-pink-400">
              <path d="M50 75 C30 60, 10 40, 30 25 C35 20, 45 25, 50 35 C55 25, 65 20, 70 25 C90 40, 70 60, 50 75" fill="currentColor" opacity="0.7"/>
              <path d="M50 75 C30 60, 10 40, 30 25 C35 20, 45 25, 50 35" fill="none" stroke="currentColor" strokeWidth="1"/>
              <path d="M50 35 C55 25, 65 20, 70 25 C90 40, 70 60, 50 75" fill="none" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </div>
          
          <div className="w-12 h-12 opacity-50">
            <svg viewBox="0 0 100 100" className="w-full h-full text-purple-400">
              <path d="M50 75 C30 60, 10 40, 30 25 C35 20, 45 25, 50 35 C55 25, 65 20, 70 25 C90 40, 70 60, 50 75" fill="currentColor" opacity="0.6"/>
            </svg>
          </div>

          <div className="w-14 h-14 opacity-40">
            <svg viewBox="0 0 100 100" className="w-full h-full text-pink-300">
              <path d="M50 75 C30 60, 10 40, 30 25 C35 20, 45 25, 50 35 C55 25, 65 20, 70 25 C90 40, 70 60, 50 75" fill="currentColor" opacity="0.5"/>
            </svg>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App; 