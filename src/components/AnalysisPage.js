import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PeriodTracker } from '../utils/periodTracker';

const AnalysisPage = ({ periodDates }) => {
  // Handle case with insufficient data
  if (periodDates.length < 2) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 p-6">
        <h1 className="text-4xl font-handwriting text-gray-700 mb-4">Statistical Analysis</h1>
        <p className="text-gray-600 mb-8">Not enough data to show analysis. Please log at least two periods.</p>
        <Link to="/" className="text-purple-600 hover:underline">
          &larr; Back to Calendar
        </Link>
      </div>
    );
  }

  // Get analysis data from PeriodTracker utility
  const cycleData = PeriodTracker.calculateCycleLengths(periodDates);
  const avgCycleLength = PeriodTracker.getAverageCycleLength(periodDates);
  const regularity = PeriodTracker.getCycleRegularity(periodDates);
  const cycleMessage = PeriodTracker.getCycleMessage(periodDates);

  const chartData = cycleData.map((cycle) => {
    const month = cycle.startDate.toLocaleString('default', { month: 'short' });
    const day = cycle.startDate.getDate();
    return {
      name: `${month} ${day}`,
      'Cycle Length': cycle.length,
      'Avg.': avgCycleLength,
    };
  });

  return (
    <div className="min-h-screen bg-pink-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-handwriting text-gray-700">Statistical Analysis</h1>
          <Link to="/" className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition">
            Back
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-center">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Average Cycle</h3>
            <p className="text-4xl font-bold text-purple-500">{avgCycleLength} <span className="text-xl">days</span></p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Cycle Regularity</h3>
            <p className="text-4xl font-bold text-purple-500">{regularity}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Current Trend</h3>
            <p className="text-lg text-purple-500 pt-3">{cycleMessage || "Keep logging for more insights!"}</p>
          </div>
        </div>

        {/* Cycle Length Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Cycle Length Variation</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Cycle Length" stroke="#ec4899" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Avg." stroke="#8884d8" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage; 