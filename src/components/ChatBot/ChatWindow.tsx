"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import MessageList from "./MessageList";
import PresetMessages from "./PresetMessages";
import { Message } from "./types";

interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
  onClose: () => void;
  onClearHistory: () => void;
}

const ChatWindow = ({
  messages,
  isTyping,
  onSendMessage,
  onClose,
  onClearHistory,
}: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-24 right-6 z-40 w-[400px] h-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h3 className="font-semibold text-white">Most Asked Questions</h3>
            <p className="text-xs text-white/80">Learn more about Jalaj</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={onClearHistory}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Clear chat history"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="text-6xl mb-4">👋</div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Welcome!
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              I'm here to help you learn more about Jalaj's work and experience.
            </p>
            <PresetMessages onSelectMessage={onSendMessage} />
          </div>
        ) : (
          <>
            <MessageList messages={messages} isTyping={isTyping} />
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area - Removed as per user request */}
    </motion.div>
  );
};

export default ChatWindow;
