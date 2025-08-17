import { motion } from "framer-motion";
import { User } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigation } from "../contexts/NavigationContext";

export function EnhancedTopBar() {
  const { currentPage, setCurrentPage } = useNavigation();

  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full bg-white/80 backdrop-blur-md border-b border-pink-100/50 px-6 py-4 flex items-center justify-between shadow-sm relative z-10"
    >
      <motion.div 
        className="flex items-center gap-3"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-400 bg-clip-text text-transparent" style={{ fontFamily: "'Dancing Script', cursive" }}>
          Velora
        </h1>
        <motion.span 
          className="text-2xl"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1]
          }}
        >
          🌸
        </motion.span>
      </motion.div>
      
      <div className="flex items-center gap-6">
        <motion.button
          onClick={() => setCurrentPage('home')}
          className={`px-4 py-2 rounded-full transition-all duration-300 ${
            currentPage === 'home' 
              ? 'bg-pink-100 text-pink-700 shadow-md' 
              : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Home
        </motion.button>
        
        <motion.button
          onClick={() => setCurrentPage('analytics')}
          className={`px-4 py-2 rounded-full transition-all duration-300 ${
            currentPage === 'analytics' 
              ? 'bg-pink-100 text-pink-700 shadow-md' 
              : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Analysis
        </motion.button>
        
        <motion.button
          onClick={() => setCurrentPage('assistant')}
          className={`px-4 py-2 rounded-full transition-all duration-300 ${
            currentPage === 'assistant' 
              ? 'bg-pink-100 text-pink-700 shadow-md' 
              : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Velora
        </motion.button>
        
        <Button variant="ghost" size="sm" className="text-pink-600 hover:text-pink-700 hover:bg-pink-50 rounded-full">
          <User className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}
