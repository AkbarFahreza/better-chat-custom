// Helper: convert {top,right,bottom,left} → "xpx ypx zpx wpx"
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

export function CSSRenderer(configState: Record<string, any>) {
  const roles = Object.keys(configState);

  return roles
    .map((role) => {
      const cfg = configState[role];
      const { content_config, name_config } = cfg;

      const attr = role !== "general" ? `[author-type="${role}"]` : "";
      const contentFlex =
        content_config.content_display[0] === "column"
          ? `  flex-direction: ${content_config.content_display[0]};\n  display: flex;`
          : "";

      const contentMargin = content_config.content_margin;
      const nameMargin = name_config.name_margin;

      const nameMarginStr = [
        `${nameMargin.top}px`,
        nameMargin.right === "auto" ? "auto" : `${nameMargin.right}px`,
        `${nameMargin.bottom}px`,
        nameMargin.left === "auto" ? "auto" : `${nameMargin.left}px`,
      ].join(" ");
      const contentMarginStr = [
        `${contentMargin.top}px`,
        contentMargin.right === "auto" ? "auto" : `${contentMargin.right}px`,
        `${contentMargin.bottom}px`,
        contentMargin.left === "auto" ? "auto" : `${contentMargin.left}px`,
      ].join(" ");

      //   const nameMargin = four(name_config.name_margin);
      const nameRounded = four(name_config.name_rounded);

      const shouldPrintMargin = Object.values(name_config.name_margin).some(
        (v) => v !== 0
      );

      const shouldPrintRounded = Object.values(name_config.name_rounded).some(
        (v) => v !== 0
      );

      let css = "";

      css += `/* ========================= */\n`;
      css += `/*        ${role.toUpperCase()}        */\n`;
      css += `/* ========================= */\n\n`;

      /* CONTENT */
      css += `yt-live-chat-text-message-renderer${attr} {\n`;
      css += `  background: ${content_config.content_background_color};\n`;
      css += `  margin: ${contentMarginStr};\n`;
      css += `  padding: ${four(content_config.content_padding)};\n`;
      if (contentFlex) css += contentFlex + "\n";
      css += `}\n\n`;

      /* NAME CHIP */
      css += `.chat-name-chip${attr} {\n`;
      css += `  background: ${name_config.name_background_color};\n`;
      css += `  padding: ${four(name_config.name_padding)};\n`;
      if (shouldPrintMargin) css += `  margin: ${nameMarginStr};\n`;
      if (shouldPrintRounded) css += `  border-radius: ${nameRounded};\n`;
      css += `  border: ${name_config.name_border.border_width}px solid ${name_config.name_border.border_color};\n`;
      css += `  display: inline-flex;\n`;
      css += `}\n\n`;

      /* NAME TEXT */
      css += `.chat-name-text${attr} {\n`;
      css += `  font-family: "${name_config.name_font_family}";\n`;
      css += `  font-size: ${name_config.name_font_size}px;\n`;
      css += `  font-weight: ${name_config.name_font_weight};\n`;
      css += `  color: ${name_config.name_font_color};\n`;
      css += `}\n`;

      return css.trim();
    })
    .join("\n\n");
}
