import React from "react";
import type { FlexDir } from "../../../types/config-types";
import BooleanEditor from "../boolean-editor";
import { motion } from "motion/react";
import OptionsEditor from "../options-editor";
import BoxModelControls from "../box-model-controls";
import { useChatConfigContext } from "../../../context/chat-config-context";
import ColorEditor from "../color-editor";

function ContentConfigs() {
  const { selectedRole, config, updateConfig } = useChatConfigContext();
  const data = config[selectedRole];
  const updateField = (field: Partial<typeof data>) => {
    updateConfig(selectedRole, {
      ...field,
    });
  };

  const contentDirectionOpts = [
    { value: "row", label: "Row" },
    { value: "column", label: "Column" },
  ];

  return (
    <motion.div
      key="content-config"
      initial={{ height: 0, translateY: -30, opacity: 0 }}
      animate={{ height: "auto", translateY: 0, opacity: 1 }}
      exit={{ height: 0, translateY: -30, opacity: 0 }}
      className="ml-6 text-sm flex flex-col gap-5"
    >
      {/* Avatar appearance */}
      <BooleanEditor
        title="Show Avatar"
        val={data.content_config.content_show_avatar}
        change={(e: React.ChangeEvent<HTMLInputElement>) =>
          updateField({
            content_config: {
              content_show_avatar: e.target.checked,
            },
          })
        }
      />
      {/* Content Direction */}
      <OptionsEditor
        title="Content Direction"
        val={data.content_config.content_display[0]}
        change={(e) => {
          updateField({
            content_config: {
              content_display: [e.target.value as FlexDir],
            },
          });
        }}
        opt={contentDirectionOpts}
      />

      {/* Background Color (with popup) */}
      <ColorEditor
        title="Background Color"
        isBackgroundSelector={true}
        bgVal={data.content_config.content_background_color}
        textVal={
          data.content_config.content_background_color === undefined
            ? "rgba(0.0.0.0,0)"
            : data.content_config.content_background_color
        }
        val={data.content_config.content_background_color}
        change={(c) => {
          updateField({
            content_config: {
              content_background_color: `rgba(${c.rgb.r},${c.rgb.g},${c.rgb.b},${c.rgb.a})`,
            },
          });
        }}
        selecting={() => {
          updateField({
            content_config: {
              content_background_color: `rgba(189,92,255,1)`,
            },
          });
        }}
        clearColor={() => {
          updateField({
            content_config: {
              content_background_color: `rgba(0,0,0,0)`,
            },
          });
        }}
      />
      {/* Border radius */}
      <BoxModelControls
        isSpacing={false}
        label="Corner Rounded"
        values={data.content_config.content_rounded}
        onChange={(next) => {
          updateField({
            content_config: {
              content_rounded: next,
            },
          });
        }}
      />
      <p className="text-main font-bold text-lg">Spacing</p>
      {/* Content Margin */}
      <BoxModelControls
        label="Margin"
        values={data.content_config.content_margin}
        onChange={(next) => {
          updateField({
            content_config: {
              content_margin: next,
            },
          });
        }}
      />
      {/* Content Padding */}
      <BoxModelControls
        label="Padding"
        values={data.content_config.content_padding}
        onChange={(next) => {
          updateField({
            content_config: {
              content_padding: next,
            },
          });
        }}
      />
    </motion.div>
  );
}

export default ContentConfigs;
