export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  action?: "contact" | "view-resume" | "projects";
}

export interface PresetMessage {
  id: string;
  label: string;
  message: string;
  icon: string;
  category: "portfolio" | "projects" | "skills" | "contact";
}
