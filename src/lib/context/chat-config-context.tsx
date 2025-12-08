// context/chat-config-context.tsx
import { createContext, useContext, useState } from "react";
import type { ChatConfigState, Role, ChatConfig } from "../types/chat-config";

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
  },
  name_config: {
    name_background_color: "transparent",
    name_margin: { top: 0, right: 0, bottom: 0, left: 0 },
    name_padding: { top: 0, right: 8, bottom: 0, left: 0 },
    name_fonts_config: {
      font_name: "Arial",
      font_size: 13,
      font_color: "#FFFFFF",
      font_weight: "500",
    },
    name_rounded: { top: 0, right: 0, bottom: 0, left: 0 },
    name_border: { border_width: 0, border_color: "unset" },
  },
};

// OWNER default
const ownerDefault: ChatConfig = {
  ...defaultConfig,
  name_config: {
    ...defaultConfig.name_config,
    name_background_color: "#FFD600",
  },
};

// MODERATOR default
const moderatorDefault: ChatConfig = {
  ...defaultConfig,
};

// MEMBER default
const memberDefault: ChatConfig = {
  ...defaultConfig,
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
  const [syncEnabled, setSyncEnabled] = useState(false);

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

export function useChatConfig() {
  const ctx = useContext(ChatConfigContext);
  if (!ctx) throw new Error("useChatConfig must be used inside provider");
  return ctx;
}
