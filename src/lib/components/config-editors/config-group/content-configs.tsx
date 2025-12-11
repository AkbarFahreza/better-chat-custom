import React from "react";
import type { FlexDir } from "../../../types/chat-config";
import BooleanEditor from "../boolean-editor";
import { AnimatePresence, motion } from "motion/react";
import OptionsEditor from "../options-editor";
import BoxModelControls from "../box-model-controls";
import { useChatConfig } from "../../../context/chat-config-context";
import ColorEditor from "../color-editor";

function ContentConfigs() {
  const { selectedRole, config, updateConfig } = useChatConfig();
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
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, translateY: -30 }}
        animate={{ height: "auto", translateY: 0 }}
        exit={{ height: 0, translateY: -30 }}
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
          click={() => {
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
    </AnimatePresence>
  );
}

export default ContentConfigs;
