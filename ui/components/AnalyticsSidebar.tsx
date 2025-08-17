import { Card } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { CheckCircle, Calendar, TrendingUp } from "lucide-react";

// Mock data for the chart
const cycleData = [
  { month: 'Jul', days: 28, early: 0 },
  { month: 'Aug', days: 30, early: -2 },
  { month: 'Sep', days: 29, early: -1 },
  { month: 'Oct', days: 28, early: 0 },
  { month: 'Nov', days: 30, early: -2 },
  { month: 'Dec', days: 29, early: -1 },
];

const averageCycle = 29;

export function AnalyticsSidebar() {
  return (
    <div className="w-80 bg-gradient-to-br from-pink-50 to-purple-50 border-r border-pink-100 p-6 space-y-6 overflow-y-auto">
      {/* Summary Box */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-pink-100 shadow-lg">
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-pink-600" />
          Cycle Summary
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600">Your last cycle:</p>
            <p className="text-xl font-medium text-gray-800">30 days</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">This month:</p>
            <p className="text-lg font-medium text-pink-600">2 days early</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Cycle average:</p>
            <p className="text-lg font-medium text-green-600 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Consistent
            </p>
          </div>
        </div>
      </Card>

      {/* Chart */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-pink-100 shadow-lg">
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-pink-600" />
          6-Month Trend
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cycleData}>
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                className="text-xs text-gray-500"
              />
              <YAxis 
                domain={[25, 32]} 
                axisLine={false} 
                tickLine={false} 
                className="text-xs text-gray-500"
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 rounded-lg shadow-lg border border-pink-100">
                        <p className="font-medium text-gray-800">{label}</p>
                        <p className="text-pink-600">{data.days} days</p>
                        <p className="text-sm text-gray-600">
                          {data.early === 0 ? 'On time' : `${Math.abs(data.early)} day${Math.abs(data.early) > 1 ? 's' : ''} ${data.early > 0 ? 'late' : 'early'}`}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine 
                y={averageCycle} 
                stroke="#e2e8f0" 
                strokeDasharray="5 5" 
                label={{ value: "Average", position: "topRight", className: "text-xs text-gray-500" }}
              />
              <Line 
                type="monotone" 
                dataKey="days" 
                stroke="#ec4899" 
                strokeWidth={3}
                dot={{ fill: "#ec4899", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "#ec4899" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Insights Box */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Insights</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-800">Cycle Regularity: High</span>
          </div>
          <div>
            <p className="text-sm text-gray-600">Next Expected Period:</p>
            <p className="font-medium text-gray-800">January 16, 2025</p>
          </div>
          <p className="text-sm text-gray-600 italic mt-4 p-3 bg-white/60 rounded-lg">
            Your cycles are very consistent! Keep tracking to maintain this healthy pattern.
          </p>
        </div>
      </Card>
    </div>
  );
}