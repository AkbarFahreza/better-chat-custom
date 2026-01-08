import { animationKeyframesMap } from "../../../context/animation-context";

type FontMap = Map<string, Set<string>>;

function four(obj: {
  top: number;
  right: number;
  bottom: number;
  left: number;
}) {
  return [obj.top, obj.right, obj.bottom, obj.left]
    .map((v) => `${v}px`)
    .join(" ");
}

function collectFonts(
  fontMap: FontMap,
  family: string,
  weight: number | string
) {
  if (!family) return;

  if (!fontMap.has(family)) {
    fontMap.set(family, new Set());
  }

  fontMap.get(family)!.add(String(weight));
}

function FONT_FALLBACKS(family: string) {
  if (/mono|code/i.test(family)) return "monospace";
  if (/serif/i.test(family)) return "serif";
  return "sans-serif";
}

function fontStack(family: string) {
  const fallback = FONT_FALLBACKS(family);
  return fallback ? `"${family}", ${fallback}` : `"${family}", sans-serif`; // safe default
}

function buildFontImports(fontMap: FontMap) {
  let css = "";

  fontMap.forEach((weights, family) => {
    const w = Array.from(weights).sort().join(";");

    css += `@import url("https://fonts.googleapis.com/css2?family=${family.replace(
      / /g,
      "+"
    )}:wght@${w}&display=swap");\n`;
  });

  return css.trim();
}

export function CSSRenderer(configState: Record<string, any>) {
  const roles = Object.keys(configState);
  const fontMap: FontMap = new Map();

  const STATIC_CSS = `
/* ========================= */
/* Made by : @dereza */
/* ========================= */

yt-live-chat-banner-manager {
  display: none !important;
}

yt-live-chat-action-panel-renderer,
yt-live-chat-renderer #action-panel {
  display: none !important;
}

yt-live-chat-renderer {
  background-color: transparent !important;
}

yt-live-chat-text-message-renderer,
yt-live-chat-text-message-renderer[is-highlighted] {
  background-color: transparent !important;
}

yt-live-chat-text-message-renderer[author-type="owner"],
yt-live-chat-text-message-renderer[author-type="owner"][is-highlighted] {
  background-color: transparent !important;
}

yt-live-chat-text-message-renderer[author-type="moderator"],
yt-live-chat-text-message-renderer[author-type="moderator"][is-highlighted] {
  background-color: transparent !important;
}

yt-live-chat-text-message-renderer[author-type="member"],
yt-live-chat-text-message-renderer[author-type="member"][is-highlighted] {
  background-color: transparent !important;
}

yt-live-chat-author-chip #author-name {
  background-color: transparent !important;
}

yt-live-chat-text-message-renderer #content,
yt-live-chat-legacy-paid-message-renderer #content {
  overflow: initial !important;
}

yt-live-chat-item-list-renderer #items,
yt-live-chat-item-list-renderer #item-scroller {
  overflow: hidden !important;
}

yt-live-chat-header-renderer,
yt-live-chat-message-input-renderer {
  display: none !important;
}

yt-live-chat-text-message-renderer,
yt-live-chat-legacy-paid-message-renderer {
  padding-left: 4px !important;
  padding-right: 4px !important;
}

yt-live-chat-paid-message-renderer #header {
  padding-left: 4px !important;
  padding-right: 4px !important;
}

/* Hide badges. */
yt-live-chat-text-message-renderer #author-badges {
  display: none !important;
  vertical-align: text-top !important;
}

/* Timestamps. */
yt-live-chat-text-message-renderer #timestamp {
  display: none !important;
}

yt-live-chat-text-message-renderer yt-live-chat-author-badge-renderer {
  margin-left: 5px !important;
  padding: 3px;
  transform: scale(1.2);
}

yt-live-chat-text-message-renderer
  yt-live-chat-author-badge-renderer[type="member"] {
  transform: scale(1.5);
}

`.trim();
  const STATIC_CSS1 = `
yt-live-chat-paid-message-renderer #author-name,
yt-live-chat-paid-message-renderer #author-name *,
yt-live-chat-legacy-paid-message-renderer #event-text,
yt-live-chat-legacy-paid-message-renderer #event-text * {
  color: #ffffff !important;
  font-size: 20px !important;
  line-height: 20px !important;
}

yt-live-chat-paid-message-renderer #purchase-amount,
yt-live-chat-paid-message-renderer #purchase-amount *,
yt-live-chat-legacy-paid-message-renderer #detail-text,
yt-live-chat-legacy-paid-message-renderer #detail-text * {
  color: #ffffff !important;
  font-size: 18px !important;
  line-height: 18px !important;
}

yt-live-chat-paid-message-renderer #content,
yt-live-chat-paid-message-renderer #content * {
  color: #ffffff !important;
  font-size: 18px !important;
  line-height: 18px !important;
}

yt-live-chat-moderation-message-renderer {
  display: none !important;
}

yt-live-chat-paid-message-renderer {
  margin: 4px 0 !important;
}

yt-live-chat-legacy-paid-message-renderer {
  background-color: #0f9d58 !important;
  margin: 4px 0 !important;
}

yt-live-chat-text-message-renderer a,
yt-live-chat-legacy-paid-message-renderer a {
  text-decoration: none !important;
}

yt-live-chat-text-message-renderer[is-deleted],
yt-live-chat-legacy-paid-message-renderer[is-deleted] {
  display: none !important;
}

yt-live-chat-ticker-renderer {
  background-color: transparent !important;
  box-shadow: none !important;
}

yt-live-chat-ticker-renderer {
  display: none !important;
}

yt-live-chat-ticker-paid-message-item-renderer,
yt-live-chat-ticker-paid-message-item-renderer *,
yt-live-chat-ticker-sponsor-item-renderer,
yt-live-chat-ticker-sponsor-item-renderer * {
  color: #ffffff !important;
}

yt-live-chat-mode-change-message-renderer,
yt-live-chat-viewer-engagement-message-renderer,
yt-live-chat-restricted-participation-renderer {
  display: none !important;
}

#header-content-primary-column {
  position: unset !important;
}

yt-live-chat-banner-manager {
  display: none !important;
}

yt-live-chat-action-panel-renderer,
yt-live-chat-renderer #action-panel {
  display: none !important;
}

ytd-sponsorships-live-chat-gift-purchase-announcement-renderer #menu,
yt-live-chat-paid-message-renderer #header-content #menu,
yt-live-chat-membership-item-renderer #menu {
  display: none !important;
}

ytd-sponsorships-live-chat-header-renderer .rhs-image {
  display: none !important;
}

#reaction-control-panel-overlay {
  display: none !important;
}

#panel-pages {
  border: none !important;
}

ytd-sponsorships-live-chat-gift-redemption-announcement-renderer {
  display: none !important;
}

#panel-pages,
#separator {
  display: none !important;
}

#gradient-container,
yt-live-chat-paid-message-renderer #gradient-container {
  display: none !important;
}

#action-buttons {
  display: none !important;
}

#before-content-buttons {
  display: none !important;
}
body {
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0);
}

`.trim();

  const dynamicCSS = roles.map((role) => {
    const { content_config, name_config, message_config } = configState[role];

    const attr = role !== "general" ? `[author-type="${role}"]` : "";
    const contentFlex =
      content_config.content_display[0] === "column"
        ? `  display: flex;\n  flex-direction: column;`
        : "";

    const contentMargin = content_config.content_margin;
    const nameMargin = name_config.name_margin;
    const messageMargin = message_config.message_margin;

    const contentMarginStr = [
      `${contentMargin.top}px`,
      contentMargin.right === "auto" ? "auto" : `${contentMargin.right}px`,
      `${contentMargin.bottom}px`,
      contentMargin.left === "auto" ? "auto" : `${contentMargin.left}px`,
    ].join(" ");

    const nameMarginStr = [
      `${nameMargin.top}px`,
      nameMargin.right === "auto" ? "auto" : `${nameMargin.right}px`,
      `${nameMargin.bottom}px`,
      nameMargin.left === "auto" ? "auto" : `${nameMargin.left}px`,
    ].join(" ");

    const isNameMargin = Object.values(nameMargin).some((v) => v !== 0);
    const isNameRounded = Object.values(name_config.name_rounded).some(
      (v) => v !== 0
    );

    const MessageMarginStr = [
      `${messageMargin.top}px`,
      messageMargin.right === "auto" ? "auto" : `${messageMargin.right}px`,
      `${messageMargin.bottom}px`,
      messageMargin.left === "auto" ? "auto" : `${messageMargin.left}px`,
    ].join(" ");

    const isMessageMargin = Object.values(messageMargin).some((v) => v !== 0);
    const isMessageRounded = Object.values(message_config.message_rounded).some(
      (v) => v !== 0
    );

    collectFonts(
      fontMap,
      name_config.name_font_family,
      name_config.name_font_weight
    );

    collectFonts(
      fontMap,
      message_config.message_font_family,
      message_config.message_font_weight
    );

    let css = "";

    css += `/* ========================= */\n`;
    css += `/*        ${role.toUpperCase()}        */\n`;
    css += `/* ========================= */\n\n`;

    /* WRAPPER */
    css += `yt-live-chat-text-message-renderer${attr} {\n`;
    css += `  animation: ${content_config.content_animation} ${content_config.content_animation_duration}s ease-in-out;\n`;
    css += `}\n`;
    // ANIMATION KEYFRAME
    // ANIMATION KEYFRAME (TEXT OUTPUT ONLY)
    css += content_config.content_animation
      .map((name: any) => animationKeyframesMap[name])
      .filter(Boolean)
      .join("");
    css += `\n`;
    /* AVATAR */
    css += `yt-live-chat-text-message-renderer${attr} #author-photo {\n`;
    css += `  display : ${
      content_config.content_show_avatar ? "flex" : "none"
    } !important;\n`;
    css += `}\n\n`;
    /* CONTENT */
    css += `yt-live-chat-text-message-renderer${attr} #content {\n`;
    css += `  background: ${content_config.content_background_color} !important;\n`;
    css += `  margin: ${contentMarginStr} !important;\n`;
    css += `  padding: ${four(content_config.content_padding)} !important;\n`;
    if (contentFlex) css += contentFlex + "\n";
    css += `}\n\n`;

    /* NAME CHIP */
    css += `yt-live-chat-text-message-renderer${attr} yt-live-chat-author-chip {\n`;
    css += `  background: ${name_config.name_background_color} !important;\n`;
    css += `  padding: ${four(name_config.name_padding)} !important;\n`;
    if (isNameMargin) css += `  margin: ${nameMarginStr} !important;\n`;
    if (isNameRounded)
      css += `  border-radius: ${four(name_config.name_rounded)};\n`;
    // css += `  border: ${name_config.name_border.border_width}px solid ${name_config.name_border.border_color};\n`;
    css += `  display: inline-flex;\n`;
    css += `}\n\n`;

    /* NAME TEXT */
    css += `yt-live-chat-text-message-renderer${attr} #author-name {\n`;
    css += `  font-family: ${fontStack(
      name_config.name_font_family
    )} !important;\n`;
    css += `  font-size: ${name_config.name_font_size}px !important;\n`;
    css += `  font-weight: ${name_config.name_font_weight} !important;\n`;
    css += `  color: ${name_config.name_font_color} !important;\n`;
    css += `  letter-spacing: ${name_config.name_font_letter_spacing} !important;\n`;
    css += `}\n`;

    /* MESSGAE WRAPPER */
    css += `yt-live-chat-text-message-renderer${attr} #message {\n`;
    css += `  background: ${message_config.message_background_color} !important;\n`;
    css += `  padding: ${four(message_config.message_padding)} !important;\n`;
    if (isMessageMargin) css += `  margin: ${MessageMarginStr} !important;\n`;
    if (isMessageRounded)
      css += `  border-radius: ${four(message_config.name_rounded)};\n`;
    css += `  letter-spacing: ${message_config.message_font_letter_spacing} !important;\n`;
    // css += `  border: ${name_config.name_border.border_width}px solid ${name_config.name_border.border_color};\n`;
    css += `}\n`;

    /* MESSGAE */
    css += `yt-live-chat-text-message-renderer${attr} #message *,\n`;
    css += `yt-live-chat-text-message-renderer${attr} #message {\n`;
    css += `  font-family: ${fontStack(
      message_config.message_font_family
    )} !important;\n`;
    css += `  font-size: ${message_config.message_font_size}px !important;\n`;
    css += `  font-weight: ${message_config.message_font_weight} !important;\n`;
    css += `  color: ${message_config.message_font_color} !important;\n`;
    css += `}\n`;

    return css;
  });

  const fontImports = buildFontImports(fontMap);

  return [fontImports, STATIC_CSS, ...dynamicCSS, STATIC_CSS1].join("\n\n");
}
