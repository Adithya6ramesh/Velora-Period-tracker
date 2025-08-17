import { motion } from "motion/react";
import { ArrowLeft, TrendingUp, Calendar, Target } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from "recharts";
import { useNavigation } from "../contexts/NavigationContext";

const cycleData = [
  { month: 'Mar 5', days: 28 },
  { month: 'Apr 3', days: 30 },
  { month: 'May 1', days: 28 },
  { month: 'May 29', days: 29 },
];

export function AnalyticsPage() {
  const { setCurrentPage } = useNavigation();

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100
      }
    })
  };

  return (
    <div className="min-h-screen p-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => setCurrentPage('home')}
            className="text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-full p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-light text-gray-700">Statistical Analysis</h1>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="p-6 bg-white/90 backdrop-blur-md border border-pink-100/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-pink-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-700">Average Cycle</h3>
              </div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent"
              >
                28 days
              </motion.div>
            </Card>
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="p-6 bg-white/90 backdrop-blur-md border border-purple-100/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-700">Cycle Regularity</h3>
              </div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
              >
                Regular
              </motion.div>
            </Card>
          </motion.div>

          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="p-6 bg-white/90 backdrop-blur-md border border-green-100/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-700">Current Trend</h3>
              </div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-sm text-gray-600"
              >
                Your cycle is regular this month.
              </motion.div>
            </Card>
          </motion.div>
        </div>

        {/* Chart */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6 bg-white/90 backdrop-blur-md border border-pink-100/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-medium text-gray-700 mb-6">Cycle Length Variation</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cycleData}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    className="text-sm text-gray-500"
                  />
                  <YAxis 
                    domain={[25, 35]} 
                    axisLine={false} 
                    tickLine={false} 
                    className="text-sm text-gray-500"
                  />
                  <ReferenceLine 
                    y={28} 
                    stroke="#e2e8f0" 
                    strokeDasharray="5 5" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="days" 
                    stroke="url(#gradient)"
                    strokeWidth={3}
                    dot={{ fill: "#ec4899", strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: "#ec4899" }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"></div>
                <span>Cycle Length</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-gray-300"></div>
                <span>Avg</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}