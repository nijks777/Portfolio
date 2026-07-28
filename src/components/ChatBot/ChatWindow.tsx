'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import MessageList from './MessageList';
import PresetMessages from './PresetMessages';
import { Message } from './types';

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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="border-border bg-surface fixed right-4 bottom-24 left-4 z-40 flex h-[min(600px,calc(100dvh-8rem))] flex-col overflow-hidden rounded-2xl border shadow-2xl sm:right-6 sm:left-auto sm:w-[400px]"
    >
      {/* Header */}
      <div className="border-border flex items-center justify-between border-b bg-gradient-to-r from-orange-500 to-orange-600 p-4">
        <div className="flex items-center gap-3">
          <div className="bg-surface flex h-10 w-10 items-center justify-center rounded-full">
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
              className="rounded-lg p-2 transition-colors hover:bg-white/10"
              title="Clear chat history"
            >
              <svg
                className="h-5 w-5 text-white"
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
            className="rounded-lg p-2 transition-colors hover:bg-white/10"
          >
            <svg
              className="h-5 w-5 text-white"
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
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 text-6xl">👋</div>
            <h4 className="text-fg-strong mb-2 text-lg font-semibold">
              Welcome!
            </h4>
            <p className="text-muted mb-6 text-sm">
              I&apos;m here to help you learn more about Jalaj&apos;s work and
              experience.
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
