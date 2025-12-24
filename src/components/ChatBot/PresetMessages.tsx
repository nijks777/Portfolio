"use client";

import { motion } from "framer-motion";
import { PresetMessage } from "./types";

interface PresetMessagesProps {
  onSelectMessage: (message: string) => void;
}

const presetMessages: PresetMessage[] = [
  {
    id: "1",
    label: "Tell me about Jalaj's experience",
    message: "Tell me about Jalaj's experience",
    icon: "👤",
    category: "portfolio",
  },
  {
    id: "2",
    label: "What are his technical skills?",
    message: "What are his technical skills?",
    icon: "⚡",
    category: "skills",
  },
  {
    id: "3",
    label: "Can I see his resume?",
    message: "Can I see his resume?",
    icon: "📄",
    category: "portfolio",
  },
  {
    id: "4",
    label: "Is he available for work?",
    message: "Is he available for work?",
    icon: "💼",
    category: "contact",
  },
  {
    id: "5",
    label: "What are Jalaj's achievements?",
    message: "What are Jalaj's achievements?",
    icon: "🏆",
    category: "portfolio",
  },
  {
    id: "6",
    label: "Show me his projects",
    message: "What projects has Jalaj built?",
    icon: "🚀",
    category: "projects",
  },
];

const PresetMessages = ({ onSelectMessage }: PresetMessagesProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
      {presetMessages.map((preset, index) => (
        <motion.button
          key={preset.id}
          onClick={() => onSelectMessage(preset.message)}
          className="p-3 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-purple-500 transition-all text-left group cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-start gap-2">
            <span className="text-2xl group-hover:scale-110 transition-transform">
              {preset.icon}
            </span>
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-800 dark:text-gray-200 line-clamp-2">
                {preset.label}
              </p>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default PresetMessages;
