import { motion } from "framer-motion";

export function VeloraAssistantPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl text-gray-700 mb-4 tracking-wide italic font-amaze font-light">
          Velora Assistant
        </h1>
        <p className="text-gray-600 text-lg">
          Your AI-powered period health assistant will be available here.
        </p>
      </motion.div>
    </div>
  );
}
