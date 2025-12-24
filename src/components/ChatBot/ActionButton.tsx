"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface ActionButtonProps {
  action: "contact" | "view-resume" | "projects";
}

const ActionButton = ({ action }: ActionButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (action === "contact") {
      router.push("/contact");
    } else if (action === "view-resume") {
      router.push("/resume");
    } else if (action === "projects") {
      router.push("/projects");
    }
  };

  const buttonConfig = {
    contact: {
      label: "Contact Me",
      icon: "📧",
      gradient: "from-green-500 to-emerald-600",
    },
    "view-resume": {
      label: "View Resume",
      icon: "📄",
      gradient: "from-blue-500 to-indigo-600",
    },
    projects: {
      label: "View Projects",
      icon: "🚀",
      gradient: "from-purple-500 to-pink-600",
    },
  };

  const config = buttonConfig[action];

  return (
    <motion.button
      onClick={handleClick}
      className={`mt-3 px-6 py-3 bg-gradient-to-r ${config.gradient} text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 justify-center w-full cursor-pointer`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </motion.button>
  );
};

export default ActionButton;
