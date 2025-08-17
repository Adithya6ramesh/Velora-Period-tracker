import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Send, Heart, Music, Leaf } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { useNavigation } from "../contexts/NavigationContext";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function VeloraAssistantPage() {
  const { setCurrentPage } = useNavigation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! 🌸 I'm Velora, your cycle companion. How are you feeling today?",
      isUser: false,
      timestamp: new Date()
    },
    {
      id: '2',
      text: "For cramps, try magnesium-rich foods like dark chocolate, spinach, and almonds. Warm herbal tea can help too! 🍵",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");

  const quickPrompts = [
    "I feel bloated today",
    "Foods for cramps",
    "Feeling low"
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");

    // Simulate response
    setTimeout(() => {
      const responses = [
        "I hear you 💖. That's completely normal during your cycle. Try some gentle stretches and stay hydrated!",
        "For natural relief, consider chamomile tea or a warm bath with Epsom salts. Your body is doing amazing work! 🛁",
        "Remember to be gentle with yourself. Would you like some mood-boosting suggestions? 🌈"
      ];
      
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputText(prompt);
  };

  return (
    <div className="min-h-screen relative z-10">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-6 border-b border-pink-100/50 bg-white/80 backdrop-blur-md"
        >
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setCurrentPage('home')}
              className="text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-full p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Heart className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-medium text-gray-800">Velora Assistant</h3>
                <p className="text-sm text-gray-600">Here to support you 💬</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Chat Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md p-4 rounded-2xl shadow-sm ${
                    message.isUser
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white ml-4'
                      : 'bg-white/90 backdrop-blur-md text-gray-800 border border-pink-100/50 mr-4'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-6 border-t border-pink-100/50 bg-white/60 backdrop-blur-md"
        >
          <div className="flex gap-3 mb-4">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 border-pink-200 text-pink-700 hover:bg-pink-50 rounded-full"
            >
              <Music className="w-4 h-4 mr-2" />
              Calming Music
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 border-green-200 text-green-700 hover:bg-green-50 rounded-full"
            >
              <Leaf className="w-4 h-4 mr-2" />
              Nutrition Tips
            </Button>
          </div>

          {/* Quick Prompts */}
          <div className="flex flex-wrap gap-2 mb-4">
            {quickPrompts.map((prompt, index) => (
              <motion.button
                key={index}
                onClick={() => handleQuickPrompt(prompt)}
                className="px-3 py-2 text-xs bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-full border border-pink-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {prompt}
              </motion.button>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-3">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Share how you're feeling..."
              className="flex-1 border-pink-200 focus:border-pink-400 rounded-full bg-white/80 backdrop-blur-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full px-6"
              size="sm"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}