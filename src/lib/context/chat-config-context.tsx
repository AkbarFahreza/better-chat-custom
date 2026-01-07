// context/chat-config-context.tsx
import { createContext, useContext, useState } from "react";
import type { ChatConfigState, Role, ChatConfig } from "../types/config-types";

// Deep merge helper → WAJIB agar tidak overwrite bagian lain
function deepMerge<T>(target: T, source: Partial<T>): T {
  const result: any = { ...target };
  for (const key in source) {
    if (
      typeof source[key] === "object" &&
      source[key] !== null &&
      !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(target[key], source[key] as any);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

// BASE DEFAULT (for General)
const defaultConfig: ChatConfig = {
  content_config: {
    content_background_color: "transparent",
    content_margin: { top: 0, right: 0, bottom: 0, left: 0 },
    content_padding: { top: 0, right: 0, bottom: 0, left: 0 },
    content_display: ["row"],
    content_show_avatar: true,
    content_rounded: { top: 0, right: 0, bottom: 0, left: 0 },
  },
  name_config: {
    name_background_color: "transparent",
    name_margin: { top: 0, right: 0, bottom: 0, left: 0 },
    name_padding: { top: 0, right: 8, bottom: 0, left: 0 },
    name_font_family: "Quicksand",
    name_font_size: 13,
    name_font_color: "rgba(255, 255, 255, 0.7)",
    name_font_weight: "500",
    name_font_letter_spacing: 0,
    name_rounded: { top: 0, right: 0, bottom: 0, left: 0 },
    name_border: { border_width: 0, border_color: "unset" },
    name_rotation: 0,
  },
  message_config: {
    message_background_color: "transparent",
    message_margin: { top: 0, right: 0, bottom: 0, left: 0 },
    message_padding: { top: 0, right: 8, bottom: 0, left: 0 },
    message_font_family: "Quicksand",
    message_font_size: 13,
    message_font_color: "#ffffff",
    message_font_weight: "500",
    message_font_letter_spacing: 0,
    message_rounded: { top: 0, right: 0, bottom: 0, left: 0 },
    message_border: { border_width: 0, border_color: "unset" },
    message_rotation: 0,
  },
};

// OWNER default
const ownerDefault: ChatConfig = {
  ...defaultConfig,
  name_config: {
    ...defaultConfig.name_config,
    name_background_color: "#FFD600",
    name_font_color: "#000000",
    name_padding: { top: 2, right: 4, bottom: 2, left: 4 },
    name_margin: { top: 0, right: 8, bottom: 0, left: 0 },
    name_rounded: { top: 2, right: 2, bottom: 2, left: 2 },
  },
};

// MODERATOR default
const moderatorDefault: ChatConfig = {
  ...defaultConfig,
  name_config: {
    ...defaultConfig.name_config,
    name_font_color: "#5e84f1",
  },
};

// MEMBER default
const memberDefault: ChatConfig = {
  ...defaultConfig,
  name_config: {
    ...defaultConfig.name_config,
    name_font_color: "#2ba640",
  },
};

// INITIAL STATE
const initialState: ChatConfigState = {
  general: defaultConfig,
  owner: ownerDefault,
  moderator: moderatorDefault,
  member: memberDefault,
};

const ChatConfigContext = createContext<any>(undefined);

export function ChatConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedRole, setSelectedRole] = useState<Role>("general");
  const [config, setConfig] = useState<ChatConfigState>(initialState);
  const [syncEnabled, setSyncEnabled] = useState(true);

  const updateConfig = (role: Role, partial: Partial<ChatConfig>) => {
    setConfig((prev) => {
      const updatedRoleConfig = deepMerge(prev[role], partial);

      // SYNC → apply edited GENERAL to all
      if (syncEnabled && role === "general") {
        return {
          general: updatedRoleConfig,
          owner: deepMerge(prev.owner, partial),
          moderator: deepMerge(prev.moderator, partial),
          member: deepMerge(prev.member, partial),
        };
      }

      // No sync
      return {
        ...prev,
        [role]: updatedRoleConfig,
      };
    });
  };

  return (
    <ChatConfigContext.Provider
      value={{
        selectedRole,
        setSelectedRole,
        config,
        updateConfig,
        syncEnabled,
        setSyncEnabled,
      }}
    >
      {children}
    </ChatConfigContext.Provider>
  );
}

export function useChatConfigContext() {
  const ctx = useContext(ChatConfigContext);
  if (!ctx)
    throw new Error("useChatConfigContext must be used inside provider");
  return ctx;
}
