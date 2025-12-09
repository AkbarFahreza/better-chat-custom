// types/chatConfig.ts

export type FlexDir = "row" | "column";
export type NameConfig = {
  name_background_color: string;
  name_margin: { top: number; right: number; bottom: number; left: number };
  name_padding: { top: number; right: number; bottom: number; left: number };
  name_fonts_family: string;
  name_font_size: number;
  name_font_color: string;
  name_font_weight: string;
  name_rounded: { top: number; right: number; bottom: number; left: number };
  name_border: { border_width: number; border_color: string };
};

export type ContentConfig = {
  content_background_color: string;
  content_margin: { top: number; right: number; bottom: number; left: number };
  content_padding: { top: number; right: number; bottom: number; left: number };
  content_display: FlexDir[];
  content_show_avatar: boolean;
};

export type Role = "general" | "owner" | "moderator" | "member";

export type ChatConfig = {
  content_config: ContentConfig;
  name_config: NameConfig;
};

export type ChatConfigState = {
  general: ChatConfig;
  owner: ChatConfig;
  moderator: ChatConfig;
  member: ChatConfig;
};
