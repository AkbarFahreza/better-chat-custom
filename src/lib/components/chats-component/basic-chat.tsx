import React from "react";
import { useChatConfigContext } from "../../context/chat-config-context";
import type { FlexDir, Role } from "../../types/config-types";

function BasicChat({ role }: { role: Role }) {
  const { config } = useChatConfigContext();
  const chatConfig = config[role || "general"]; // ⬅ always use GENERAL config

  const { content_config, name_config, message_config } = chatConfig;

  const flexDisplay = content_config.content_display[0] || ("row" as FlexDir);
  const contentMargin = content_config.content_margin;
  const nameMargin = name_config.name_margin;
  const messageMargin = message_config.message_margin;

  // simplify content margin thing
  const contentMarginStr = [
    `${contentMargin.top}px`,
    contentMargin.right === "auto" ? "auto" : `${contentMargin.right}px`,
    `${contentMargin.bottom}px`,
    contentMargin.left === "auto" ? "auto" : `${contentMargin.left}px`,
  ].join(" ");
  // simplify name margin thing
  const nameMarginStr = [
    `${nameMargin.top}px`,
    nameMargin.right === "auto" ? "auto" : `${nameMargin.right}px`,
    `${nameMargin.bottom}px`,
    nameMargin.left === "auto" ? "auto" : `${nameMargin.left}px`,
  ].join(" ");
  // simplify message margin thing
  const messageMarginStr = [
    `${messageMargin.top}px`,
    messageMargin.right === "auto" ? "auto" : `${messageMargin.right}px`,
    `${messageMargin.bottom}px`,
    messageMargin.left === "auto" ? "auto" : `${messageMargin.left}px`,
  ].join(" ");

  const CntStyle: React.CSSProperties = {
    padding: `${content_config.content_padding.top}px ${content_config.content_padding.right}px ${content_config.content_padding.bottom}px ${content_config.content_padding.left}px`,
    margin: contentMarginStr,
    flexDirection: flexDisplay,
    display: flexDisplay === "column" ? "flex" : "",
    rowGap: flexDisplay === "column" ? 16 : 0,
    backgroundColor: content_config.content_background_color,
    borderRadius: `${content_config.content_rounded.top}px ${content_config.content_rounded.right}px ${content_config.content_rounded.bottom}px ${content_config.content_rounded.left}px`,
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
    background: name_config.name_background_color,
    padding: `${name_config.name_padding.top}px ${name_config.name_padding.right}px ${name_config.name_padding.bottom}px ${name_config.name_padding.left}px`,
    margin: nameMarginStr,
    borderRadius: `${name_config.name_rounded.top}px ${name_config.name_rounded.right}px ${name_config.name_rounded.bottom}px ${name_config.name_rounded.left}px`,
    border: `${name_config.name_border.border_width}px solid ${name_config.name_border.border_color}`,
    rotate: `${name_config.name_rotation}deg`,
    width: "fit-content",
  };

  const authorNameStyle: React.CSSProperties = {
    fontFamily: `${name_config.name_font_family}`,
    fontSize: name_config.name_font_size,
    fontWeight: name_config.name_font_weight,
    color: name_config.name_font_color,
    letterSpacing: name_config.name_font_letter_spacing,
  };

  const authorMsgStyle: React.CSSProperties = {
    background: message_config.message_background_color,
    padding: `${message_config.message_padding.top}px ${message_config.message_padding.right}px ${message_config.message_padding.bottom}px ${message_config.message_padding.left}px`,
    margin: messageMarginStr,
    borderRadius: `${message_config.message_rounded.top}px ${message_config.message_rounded.right}px ${message_config.message_rounded.bottom}px ${message_config.message_rounded.left}px`,
    border: `${message_config.message_border.border_width}px solid ${message_config.message_border.border_color}`,
    rotate: `${message_config.message_rotation}deg`,
    fontFamily: `${message_config.message_font_family}`,
    fontSize: message_config.message_font_size,
    fontWeight: message_config.message_font_weight,
    color: message_config.message_font_color,
    letterSpacing: message_config.message_font_letter_spacing,
  };

  const authorName =
    role === "owner"
      ? "@RezaTheOwner"
      : role === "moderator"
      ? "@moderator_ngawi"
      : role === "member"
      ? "@mas_azril"
      : "@dekreza";

  const authorMessage =
    role === "owner"
      ? "Seporsi mie ayam sebelum porsi lainnya"
      : role === "moderator"
      ? "Lha elu mah enak member"
      : role === "member"
      ? "Yaudah makan aku sini kalo enak"
      : "Kenapa selalu diingatkan untuk tidak menyakiti tapi tidak diingatkan untuk tidak tersakiti";

  return (
    <div className="items-start flex flex-row py-1">
      <div id="author-photo" style={AvatarStyle}>
        <img
          src="https://pbs.twimg.com/profile_images/1978277256003985408/VuGWrOYG_400x400.jpg"
          alt="user"
        />
      </div>
      <div id="content" style={CntStyle}>
        <div className=" inline-flex" style={authorNameChipStyle}>
          <div id="author-name" className="w-fit" style={authorNameStyle}>
            {authorName}
          </div>
        </div>
        <span id="message" style={authorMsgStyle}>
          {authorMessage}
        </span>
      </div>
    </div>
  );
}

export default React.memo(BasicChat);
