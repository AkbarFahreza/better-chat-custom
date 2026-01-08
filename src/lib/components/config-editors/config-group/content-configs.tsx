import React from "react";
import type { animationName, FlexDir } from "../../../types/config-types";
import BooleanEditor from "../boolean-editor";
import { motion } from "motion/react";
import OptionsEditor from "../options-editor";
import BoxModelControls from "../box-model-controls";
import { useChatConfigContext } from "../../../context/chat-config-context";
import ColorEditor from "../color-editor";
import AnimationContext from "../../../context/animation-context";
import NumberEditor from "../number-editor";
import { RotateCcw } from "lucide-react";

function ContentConfigs() {
  const { selectedRole, config, updateConfig } = useChatConfigContext();
  const data = config[selectedRole];
  const updateField = (field: Partial<typeof data>) => {
    updateConfig(selectedRole, {
      ...field,
    });
  };

  const contentDirectionOpts = [
    { id: 1, value: "row", label: "Row" },
    { id: 2, value: "column", label: "Column" },
  ];

  const { animationOpts } = AnimationContext();
  // const animationOpts = [
  //   { value: "row", label: "Row" },
  //   { value: "column", label: "Column" },
  // ];

  // console.log(data.content_config.content_animation);

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
      <div className="flex flex-row items-center">
        <p className="text-main font-bold text-lg config-title">Animation</p>
        <div
          onClick={() => {
            updateField({
              content_config: {
                content_animation_replay:
                  data.content_config.content_animation_replay + 1,
              },
            });
          }}
          className="flex flex-row gap-3 bg-main/20 items-center px-2 py-1 hover:bg-main/40 transition-colors rounded-md cursor-pointer"
        >
          <RotateCcw size={16} />
          <p>Replay Animation</p>
        </div>
      </div>
      <OptionsEditor
        title="Animation Name"
        val={data.content_config.content_animation[0]}
        change={(e) => {
          updateField({
            content_config: {
              content_animation: [e.target.value as animationName],
            },
          });
        }}
        opt={animationOpts}
      />
      <div className="flex flex-row">
        <NumberEditor
          label="Duration"
          val={data.content_config.content_animation_duration}
          change={(e) => {
            updateField({
              content_config: {
                content_animation_duration: parseFloat(e.target.value),
              },
            });
          }}
        />
      </div>
    </motion.div>
  );
}

export default ContentConfigs;
