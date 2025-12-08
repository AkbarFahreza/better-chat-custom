import BackgroundEditor from "../background-editor";
import { AnimatePresence, motion } from "motion/react";
import BoxModelControls from "../box-model-controls";
import { useChatConfig } from "../../../context/chat-config-context";

function NameConfigs() {
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
          click={() => {
            updateField({
              name_config: {
                name_background_color: `rgba(0,0,0,0)`,
              },
            });
          }}
        />
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
      </motion.div>
    </AnimatePresence>
  );
}

export default NameConfigs;
