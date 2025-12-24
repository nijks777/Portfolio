"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { motion } from "framer-motion";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceInput = () => {
    // TODO: Implement voice input in Step 22
    setIsRecording(!isRecording);
    alert("Voice input will be implemented in Step 22!");
  };

  return (
    <div className="flex items-end gap-2">
      {/* Voice Input Button */}
      <motion.button
        onClick={handleVoiceInput}
        className={`p-3 rounded-lg transition-colors ${
          isRecording
            ? "bg-red-500 text-white"
            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Voice input (coming in Step 22)"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      </motion.button>

      {/* Text Input */}
      <div className="flex-1 relative">
        <textarea
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="w-full px-4 py-3 pr-12 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-32"
          rows={1}
          style={{
            minHeight: "48px",
            maxHeight: "128px",
          }}
        />
        {/* Character count or typing indicator can go here */}
      </div>

      {/* Send Button */}
      <motion.button
        onClick={handleSend}
        disabled={!message.trim()}
        className={`p-3 rounded-lg transition-colors ${
          message.trim()
            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg"
            : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
        }`}
        whileHover={message.trim() ? { scale: 1.05 } : {}}
        whileTap={message.trim() ? { scale: 0.95 } : {}}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      </motion.button>
    </div>
  );
};

export default MessageInput;
