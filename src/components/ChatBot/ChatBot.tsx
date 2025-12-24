"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ChatIcon from "./ChatIcon";
import ChatWindow from "./ChatWindow";
import { Message } from "./types";
import { presetResponses } from "./presetResponses";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Check if there's a preset response
    setTimeout(() => {
      const presetResponse = presetResponses[content];

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: presetResponse
          ? presetResponse.content
          : "Thanks for your message! The backend API will be connected in Step 4 for custom responses.",
        timestamp: new Date().toISOString(),
        action: presetResponse?.action as "contact" | "view-resume" | "projects" | undefined,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleClearHistory = () => {
    setMessages([]);
    localStorage.removeItem("chatbot-messages");
  };

  const handleClose = () => {
    setIsOpen(false);
    // Clear messages when closing so it shows preset questions on reopen
    setMessages([]);
    localStorage.removeItem("chatbot-messages");
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <ChatIcon isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            messages={messages}
            isTyping={isTyping}
            onSendMessage={handleSendMessage}
            onClose={handleClose}
            onClearHistory={handleClearHistory}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
