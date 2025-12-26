import BackgroundEditor from "../color-editor";
import { AnimatePresence, motion } from "motion/react";
import BoxModelControls from "../box-model-controls";
import { useChatConfig } from "../../../context/chat-config-context";
import FontEditor from "../fonts-editor";
import NumberEditor from "../number-editor";

function MessageConfigs() {
  const { selectedRole, config, updateConfig } = useChatConfig();
  const data = config[selectedRole];
  const updateField = (field: Partial<typeof data>) => {
    updateConfig(selectedRole, {
      ...data,
      ...field,
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, translateY: -30 }}
        animate={{ height: "auto", translateY: 0 }}
        exit={{ height: 0, translateY: -30 }}
        className="ml-6 text-sm flex flex-col gap-5"
      >
        {/* Background Color (with popup) */}
        <BackgroundEditor
          title="Background Color"
          bgVal={data.message_config.message_background_color}
          textVal={
            data.message_config.message_background_color === undefined
              ? "rgba(0.0.0.0,0)"
              : data.message_config.message_background_color
          }
          val={data.message_config.message_background_color}
          change={(c) => {
            updateField({
              message_config: {
                message_background_color: `rgba(${c.rgb.r},${c.rgb.g},${c.rgb.b},${c.rgb.a})`,
              },
            });
          }}
          click={() => {
            updateField({
              message_config: {
                message_background_color: `rgba(0,0,0,0)`,
              },
            });
          }}
        />
        {/* Border radius */}
        <BoxModelControls
          isSpacing={false}
          label="Corner Rounded"
          values={data.message_config.message_rounded}
          onChange={(next) => {
            updateField({
              message_config: {
                message_rounded: next,
              },
            });
          }}
        />
        <NumberEditor
          label="Message Rotate"
          val={data.message_config.message_rotation}
          change={(e) => {
            updateField({
              message_config: {
                message_rotation: parseInt(e.target.value),
              },
            });
          }}
        />
        <p className="text-main font-bold text-lg">Spacing</p>
        {/* Content Margin */}
        <BoxModelControls
          label="Margin"
          values={data.message_config.message_margin}
          onChange={(next) => {
            updateField({
              message_config: {
                message_margin: next,
              },
            });
          }}
        />
        {/* Content Padding */}
        <BoxModelControls
          label="Padding"
          values={data.message_config.message_padding}
          onChange={(next) => {
            updateField({
              message_config: {
                message_padding: next,
              },
            });
          }}
        />

        <FontEditor textType="messageText" />
      </motion.div>
    </AnimatePresence>
  );
}

export default MessageConfigs;
