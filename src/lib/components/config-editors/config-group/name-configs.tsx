import BackgroundEditor from "../color-editor";
import { motion } from "motion/react";
import BoxModelControls from "../box-model-controls";
import { useChatConfigContext } from "../../../context/chat-config-context";
import FontEditor from "../fonts-editor";
import NumberEditor from "../number-editor";

function NameConfigs() {
  const { selectedRole, config, updateConfig } = useChatConfigContext();
  const data = config[selectedRole];
  const updateField = (field: Partial<typeof data>) => {
    updateConfig(selectedRole, {
      // ...data,
      ...field,
    });
  };

  return (
    <motion.div
      key="name-config"
      initial={{ height: 0, translateY: -30, opacity: 0 }}
      animate={{ height: "auto", translateY: 0, opacity: 1 }}
      exit={{ height: 0, translateY: -30, opacity: 0 }}
      className="ml-6 text-sm flex flex-col gap-5"
    >
      {/* Background Color (with popup) */}
      <BackgroundEditor
        title="Background Color"
        isBackgroundSelector={true}
        bgVal={data.name_config.name_background_color}
        textVal={
          data.name_config.name_background_color === undefined
            ? "rgba(0.0.0.0,0)"
            : data.name_config.name_background_color
        }
        val={data.name_config.name_background_color}
        change={(c) => {
          updateField({
            name_config: {
              name_background_color: `rgba(${c.rgb.r},${c.rgb.g},${c.rgb.b},${c.rgb.a})`,
            },
          });
        }}
        selecting={() => {
          updateField({
            name_config: {
              name_background_color: `rgba(189,92,255,1)`,
            },
          });
        }}
        clearColor={() => {
          updateField({
            name_config: {
              name_background_color: `rgba(0,0,0,0)`,
            },
          });
        }}
      />
      {/* Border radius */}
      <BoxModelControls
        isSpacing={false}
        label="Corner Rounded"
        values={data.name_config.name_rounded}
        onChange={(next) => {
          updateField({
            name_config: {
              name_rounded: next,
            },
          });
        }}
      />
      <NumberEditor
        label="Name Rotate"
        val={data.name_config.name_rotation}
        change={(e) => {
          updateField({
            name_config: {
              name_rotation: parseInt(e.target.value),
            },
          });
        }}
      />
      <p className="text-main font-bold text-lg">Spacing</p>
      {/* Content Margin */}
      <BoxModelControls
        label="Margin"
        values={data.name_config.name_margin}
        onChange={(next) => {
          updateField({
            name_config: {
              name_margin: next,
            },
          });
        }}
      />
      {/* Content Padding */}
      <BoxModelControls
        label="Padding"
        values={data.name_config.name_padding}
        onChange={(next) => {
          updateField({
            name_config: {
              name_padding: next,
            },
          });
        }}
      />

      <FontEditor textType="nameText" />
    </motion.div>
  );
}

export default NameConfigs;
