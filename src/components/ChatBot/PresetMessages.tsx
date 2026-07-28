'use client';

import { motion } from 'framer-motion';
import { PresetMessage } from './types';

interface PresetMessagesProps {
  onSelectMessage: (message: string) => void;
}

const presetMessages: PresetMessage[] = [
  {
    id: '1',
    label: "Tell me about Jalaj's experience",
    message: "Tell me about Jalaj's experience",
    icon: '👤',
    category: 'portfolio',
  },
  {
    id: '2',
    label: 'What are his technical skills?',
    message: 'What are his technical skills?',
    icon: '⚡',
    category: 'skills',
  },
  {
    id: '3',
    label: 'Can I see his resume?',
    message: 'Can I see his resume?',
    icon: '📄',
    category: 'portfolio',
  },
  {
    id: '4',
    label: 'Is he available for work?',
    message: 'Is he available for work?',
    icon: '💼',
    category: 'contact',
  },
  {
    id: '5',
    label: "What are Jalaj's achievements?",
    message: "What are Jalaj's achievements?",
    icon: '🏆',
    category: 'portfolio',
  },
  {
    id: '6',
    label: 'Show me his projects',
    message: 'What projects has Jalaj built?',
    icon: '🚀',
    category: 'projects',
  },
];

const PresetMessages = ({ onSelectMessage }: PresetMessagesProps) => {
  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-2">
      {presetMessages.map((preset, index) => (
        <motion.button
          key={preset.id}
          onClick={() => onSelectMessage(preset.message)}
          className="bg-accent-soft border-border hover:border-accent group cursor-pointer rounded-lg border p-3 text-left transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-start gap-2">
            <span className="text-2xl transition-transform group-hover:scale-110">
              {preset.icon}
            </span>
            <div className="flex-1">
              <p className="text-fg-strong line-clamp-2 text-xs font-medium">
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
