import { useState } from "react";
import { X, Calendar, Droplets, Zap, Activity } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { motion, AnimatePresence } from "motion/react";

interface PeriodLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date;
}

export function PeriodLogModal({ isOpen, onClose, selectedDate }: PeriodLogModalProps) {
  const [flow, setFlow] = useState("medium");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [mood, setMood] = useState("");
  const [notes, setNotes] = useState("");

  const flowOptions = [
    { value: "light", label: "Light", icon: "💧", color: "bg-blue-100 text-blue-800" },
    { value: "medium", label: "Medium", icon: "💧💧", color: "bg-pink-100 text-pink-800" },
    { value: "heavy", label: "Heavy", icon: "💧💧💧", color: "bg-red-100 text-red-800" }
  ];

  const symptomOptions = [
    "Cramps", "Bloating", "Headache", "Breast tenderness", 
    "Mood swings", "Fatigue", "Nausea", "Back pain"
  ];

  const moodOptions = [
    { emoji: "😊", label: "Happy" },
    { emoji: "😌", label: "Calm" },
    { emoji: "😔", label: "Sad" },
    { emoji: "😠", label: "Irritated" },
    { emoji: "😫", label: "Stressed" },
    { emoji: "😴", label: "Tired" }
  ];

  const handleSymptomToggle = (symptom: string) => {
    setSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSave = () => {
    // Here you would save the data
    console.log({
      date: selectedDate,
      flow,
      symptoms,
      mood,
      notes
    });
    onClose();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-pink-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-medium text-gray-800">Log Period</h2>
                    <p className="text-sm text-gray-600">
                      {selectedDate ? formatDate(selectedDate) : 'Today'}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Flow */}
              <div>
                <Label className="text-base font-medium text-gray-800 mb-3 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-pink-600" />
                  Flow
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  {flowOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={flow === option.value ? "default" : "outline"}
                      onClick={() => setFlow(option.value)}
                      className={`h-16 flex flex-col gap-1 ${
                        flow === option.value 
                          ? 'bg-pink-500 text-white' 
                          : 'border-pink-200 hover:bg-pink-50'
                      }`}
                    >
                      <span className="text-lg">{option.icon}</span>
                      <span className="text-xs">{option.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Symptoms */}
              <div>
                <Label className="text-base font-medium text-gray-800 mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-pink-600" />
                  Symptoms
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {symptomOptions.map((symptom) => (
                    <Button
                      key={symptom}
                      variant={symptoms.includes(symptom) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSymptomToggle(symptom)}
                      className={`h-auto py-2 text-xs ${
                        symptoms.includes(symptom)
                          ? 'bg-pink-500 text-white'
                          : 'border-pink-200 hover:bg-pink-50'
                      }`}
                    >
                      {symptom}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Mood */}
              <div>
                <Label className="text-base font-medium text-gray-800 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-pink-600" />
                  Mood
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {moodOptions.map((moodOption) => (
                    <Button
                      key={moodOption.label}
                      variant={mood === moodOption.label ? "default" : "outline"}
                      onClick={() => setMood(moodOption.label)}
                      className={`h-16 flex flex-col gap-1 ${
                        mood === moodOption.label
                          ? 'bg-pink-500 text-white'
                          : 'border-pink-200 hover:bg-pink-50'
                      }`}
                    >
                      <span className="text-2xl">{moodOption.emoji}</span>
                      <span className="text-xs">{moodOption.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="notes" className="text-base font-medium text-gray-800 mb-3 block">
                  Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="How are you feeling? Any additional notes..."
                  className="border-pink-200 focus:border-pink-400 resize-none"
                  rows={3}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-pink-100 flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1 border-gray-300">
                Cancel
              </Button>
              <Button onClick={handleSave} className="flex-1 bg-pink-500 hover:bg-pink-600 text-white">
                Save Entry
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}