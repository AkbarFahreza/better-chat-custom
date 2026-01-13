// types/chatConfig.ts

export type textAlign = "left" | "center" | "right";
export type FlexDir = "row" | "column";
export type animationName =
  | "fade_in_to_top_anim"
  | "fade_in_to_bottom_anim"
  | "fade_in_to_right_anim"
  | "fade_in_to_left_anim";
export type Sides = {
  top: number;
  right: number | "auto";
  bottom: number;
  left: number | "auto";
};

export type ContentConfig = {
  content_background_color: string;
  content_margin: Sides;
  content_padding: { top: number; right: number; bottom: number; left: number };
  content_display: FlexDir[];
  content_show_avatar: boolean;
  content_rounded: { top: number; right: number; bottom: number; left: number };
  content_animation: animationName[];
  content_animation_duration: number;
  content_animation_replay: number;
};

export type NameConfig = {
  name_background_color: string;
  name_margin: Sides;
  name_padding: { top: number; right: number; bottom: number; left: number };
  name_font_family: string;
  name_font_size: number;
  name_font_color: string;
  name_font_weight: string;
  name_font_letter_spacing: number;
  name_rounded: { top: number; right: number; bottom: number; left: number };
  name_border: { border_width: number; border_color: string };
  name_rotation: number;
  name_text_align: textAlign[];
};

export type MessageConfig = {
  message_background_color: string;
  message_margin: Sides;
  message_padding: { top: number; right: number; bottom: number; left: number };
  message_font_family: string;
  message_font_size: number;
  message_font_color: string;
  message_font_weight: string;
  message_font_letter_spacing: number;
  message_rounded: { top: number; right: number; bottom: number; left: number };
  message_border: { border_width: number; border_color: string };
  message_rotation: number;
  message_text_align: textAlign[];
};

export type Role = "general" | "owner" | "moderator" | "member";

export type ChatConfig = {
  content_config: ContentConfig;
  name_config: NameConfig;
  message_config: MessageConfig;
};

export type ChatConfigState = {
  general: ChatConfig;
  owner: ChatConfig;
  moderator: ChatConfig;
  member: ChatConfig;
};
