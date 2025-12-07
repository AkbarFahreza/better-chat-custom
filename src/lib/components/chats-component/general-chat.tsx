import React from "react";
import { useChatConfig } from "../../context/chat-config-context";
import type { FlexDir, Role } from "../../types/chat-config";

function BasicChat({ role }: { role: Role }) {
  const { config } = useChatConfig();
  const chatConfig = config[role || "general"]; // ⬅ always use GENERAL config

  const { content_config, name_config } = chatConfig;

  const flexDisplay = content_config.content_display[0] || ("row" as FlexDir);

  const CntStyle: React.CSSProperties = {
    padding: `${content_config.content_padding.top}px ${content_config.content_padding.right}px ${content_config.content_padding.bottom}px ${content_config.content_padding.left}px`,
    margin: `${content_config.content_margin.top}px ${content_config.content_margin.right}px ${content_config.content_margin.bottom}px ${content_config.content_margin.left}px`,
    flexDirection: flexDisplay,
    display: flexDisplay === "column" ? "flex" : "",
    backgroundColor: content_config.content_background_color,
  };

  const AvatarStyle: React.CSSProperties = {
    display: content_config.content_show_avatar ? "block" : "none",
    width: 24,
    height: 24,
    overflow: "hidden",
    borderRadius: "50%",
    border: "1px solid #FFFFFF",
    marginRight: 16,
    flexShrink: 0,
  };

  const authorNameChipStyle: React.CSSProperties = {
    background:
      role === "owner" ? "#FFD600" : name_config.name_background_color,
    padding: `${role === "owner" ? 2 : name_config.name_padding.top}px ${
      role === "owner" ? 4 : name_config.name_padding.right
    }px ${role === "owner" ? 2 : name_config.name_padding.bottom}px ${
      role === "owner" ? 4 : name_config.name_padding.left
    }px`,
    margin: `${name_config.name_margin.top}px ${
      role == "owner" ? 8 : name_config.name_margin.right
    }px ${name_config.name_margin.bottom}px ${name_config.name_margin.left}px`,
    borderRadius: `${role === "owner" ? 2 : name_config.name_rounded.top}px ${
      role === "owner" ? 2 : name_config.name_rounded.right
    }px ${role === "owner" ? 2 : name_config.name_rounded.bottom}px ${
      role === "owner" ? 2 : name_config.name_rounded.left
    }px`,
    border: `${name_config.name_border.border_width}px solid ${name_config.name_border.border_color}`,
    display: "inline-flex",
  };

  const authorNameStyle: React.CSSProperties = {
    fontFamily: name_config.name_fonts_config.font_name,
    fontSize: name_config.name_fonts_config.font_size,
    fontWeight: name_config.name_fonts_config.font_weight,
    color:
      role === "moderator"
        ? "#5E84F1"
        : role === "member"
        ? "#2BA640"
        : role === "owner"
        ? "#111111"
        : name_config.name_fonts_config.font_color,
  };

  const authorMsgStyle: React.CSSProperties = {
    color: "#fff",
    fontSize: 13,
    wordWrap: "break-word",
    wordBreak: "break-word",
    flexWrap: "wrap",
    overflowWrap: "break-word",
  };
  console.log("ContentStyle", content_config.content_background_color);
  return (
    <div className="items-center flex flex-row py-1 ">
      <div id="author-photo" style={AvatarStyle}>
        <img
          src="https://pbs.twimg.com/profile_images/1978277256003985408/VuGWrOYG_400x400.jpg"
          alt="user"
        />
      </div>
      <div id="content" style={CntStyle}>
        <div style={authorNameChipStyle}>
          <div id="author-name" className="w-fit" style={authorNameStyle}>
            {role === "owner"
              ? "@RezaTheOwner"
              : role === "moderator"
              ? "@moderator_ngawi"
              : "@dekreeaz"}
          </div>
        </div>
        <span id="message" style={authorMsgStyle}>
          Hallo aku viewer biasa dan mempunyai pesan yg agak panjang sih, jadi
          ya gitu sih bang
        </span>
      </div>
    </div>
  );
}

export default React.memo(BasicChat);
