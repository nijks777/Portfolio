"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Message } from "./types";
import TypingIndicator from "./TypingIndicator";
import ActionButton from "./ActionButton";

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

const MessageList = ({ messages, isTyping }: MessageListProps) => {
  return (
    <>
      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[80%] ${
              message.role === "user"
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            } rounded-2xl px-4 py-3 shadow-sm`}
          >
            {/* Message content */}
            <div className="text-sm prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>

            {/* Action Button */}
            {message.role === "assistant" && message.action && (
              <ActionButton action={message.action} />
            )}

            {/* Timestamp */}
            <p
              className={`text-xs mt-1 ${
                message.role === "user"
                  ? "text-white/70"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {new Date(message.timestamp).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </motion.div>
      ))}

      {/* Typing Indicator */}
      {isTyping && <TypingIndicator />}
    </>
  );
};

export default MessageList;
