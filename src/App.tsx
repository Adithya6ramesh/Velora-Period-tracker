import { NavigationProvider, useNavigation } from "./contexts/NavigationContext";
import { EnhancedTopBar } from "./components/EnhancedTopBar";
import { HomePage } from "./components/HomePage";
import { AnalyticsPage } from "./components/AnalyticsPage";
import { VeloraAssistantPage } from "./components/VeloraAssistantPage";
import { FloatingElements } from "./components/FloatingElements";
import { motion, AnimatePresence } from "framer-motion";

function AppContent() {
  const { currentPage } = useNavigation();

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 }
  };

  const pageTransition = {
    type: "tween" as const,
    ease: "easeInOut",
    duration: 0.5
  } as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <FloatingElements />
      
      {/* Top Navigation - only show on non-home pages */}
      {currentPage !== 'home' && <EnhancedTopBar />}
      
      {/* Main Content with Page Transitions */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentPage}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="relative z-10"
        >
          {currentPage === 'home' && (
            <>
              <EnhancedTopBar />
              <HomePage />
            </>
          )}
          {currentPage === 'analytics' && <AnalyticsPage />}
          {currentPage === 'assistant' && <VeloraAssistantPage />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}
