import { useState } from "react";
import { MessageCircle, Send, X, Music, Leaf, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function VeloraAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! 🌸 I'm Velora, your cycle companion. How are you feeling today?",
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

    // Simulate Velora's response
    setTimeout(() => {
      const responses = [
        "I hear you 💖. Bloating is so common during your cycle. Try some gentle stretches and stay hydrated!",
        "For cramps, try magnesium-rich foods like dark chocolate, spinach, and almonds. Warm herbal tea can help too! 🍵",
        "It's completely normal to feel this way. Your hormones are doing their thing. Would you like some mood-boosting suggestions? 🌈",
        "Remember to be gentle with yourself. Your body is doing amazing work! Try some deep breathing or a warm bath. 🛁"
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
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          size="lg"
        >
          <MessageCircle className="w-8 h-8" />
        </Button>
      </motion.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-96 h-full bg-gradient-to-br from-pink-50 to-purple-50 border-l border-pink-200 shadow-2xl z-40 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-pink-200 bg-white/80 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Velora Assistant</h3>
                    <p className="text-sm text-gray-600">💬 Here to support you</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-2xl ${
                      message.isUser
                        ? 'bg-pink-500 text-white'
                        : 'bg-white text-gray-800 shadow-sm border border-pink-100'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action Buttons */}
            <div className="p-4 border-t border-pink-200 bg-white/60">
              <div className="flex gap-2 mb-3">
                <Button size="sm" variant="outline" className="flex-1 text-xs border-pink-200 text-pink-700 hover:bg-pink-50">
                  <Music className="w-3 h-3 mr-1" />
                  Calming Music
                </Button>
                <Button size="sm" variant="outline" className="flex-1 text-xs border-green-200 text-green-700 hover:bg-green-50">
                  <Leaf className="w-3 h-3 mr-1" />
                  Nutrition Tips
                </Button>
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickPrompt(prompt)}
                    className="text-xs border-pink-200 text-pink-700 hover:bg-pink-50"
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-pink-200 bg-white/80">
              <div className="flex gap-2">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Share how you're feeling..."
                  className="flex-1 border-pink-200 focus:border-pink-400"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-pink-500 hover:bg-pink-600 text-white"
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}