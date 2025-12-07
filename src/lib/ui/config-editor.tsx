import { useState } from "react";
import { ChevronUp, X } from "lucide-react";
import { capitalizeFirstLetter } from "../components/functions";
import { useChatConfig } from "../context/chat-config-context";
import SyncToggle from "./sync-config-toggle";
import type { FlexDir } from "../types/chat-config";
import BooleanEditor from "../components/config-editors/boolean-editor";
import BackgroundEditor from "../components/config-editors/background-editor";
import { AnimatePresence, motion } from "motion/react";

export function ConfigEditor() {
  const { selectedRole, config, updateConfig } = useChatConfig();
  const data = config[selectedRole];

  const [isContentOpen, setIsContentOpen] = useState(false);
  const [isNameOpen, setIsNameOpen] = useState(false);

  const updateField = (field: Partial<typeof data>) => {
    updateConfig(selectedRole, {
      ...data,
      ...field,
    });
  };

  return (
    <div>
      {selectedRole === "general" && <SyncToggle />}
      <div className="w-full relative mt-3">
        <h2
          className="font-bold bg-background w-fit mb-4 py-2 pr-4  flex flex-row gap-3 cursor-pointer items-center"
          onClick={() => setIsContentOpen(!isContentOpen)}
        >
          {capitalizeFirstLetter(selectedRole)} Content Config
          <ChevronUp
            size={15}
            className={`${
              isContentOpen ? "rotate-180" : ""
            } transition-transform duration-150`}
          />
        </h2>
        <span className="w-full h-px bg-white/40 absolute top-1/2 -translate-y-1/2 left-0 -z-10"></span>
      </div>

      {/* Content Direction */}
      {isContentOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ height: 0, translateY: -30 }}
            animate={{ height: "auto", translateY: 0 }}
            exit={{ height: 0, translateY: -30 }}
            className="ml-6 text-sm flex flex-col gap-4"
          >
            <div className="flex flex-row items-center">
              <label className=" mr-5">Content Direction</label>
              <select
                className="w-3/12 py-1 px-2 bg-secondary rounded"
                value={data.content_config.content_display[0]}
                onChange={(e) =>
                  updateField({
                    content_config: {
                      content_display: [e.target.value as FlexDir],
                    },
                  })
                }
              >
                <option value="row">Row</option>
                <option value="column">Column</option>
              </select>
            </div>

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

            {/* Background Color (with popup) */}
            <BackgroundEditor
              title="Background Color"
              bgVal={data.content_config.content_background_color}
              textVal={
                data.content_config.content_background_color === undefined
                  ? "rgba(0.0.0.0,0)"
                  : data.content_config.content_background_color.replace(
                      "rgba",
                      "RGBA"
                    )
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
          </motion.div>
        </AnimatePresence>
      )}
      <div className="w-full relative mt-3">
        <h2
          className="font-bold bg-background w-fit mb-4 py-2 pr-4  flex flex-row gap-3 cursor-pointer items-center"
          onClick={() => setIsNameOpen(!isNameOpen)}
        >
          {capitalizeFirstLetter(selectedRole)} Name Config
          <ChevronUp
            size={15}
            className={`${
              isNameOpen ? "rotate-180" : ""
            } transition-transform duration-150`}
          />
        </h2>
        <span className="w-full h-px bg-white/40 absolute top-1/2 -translate-y-1/2 left-0 -z-10"></span>
      </div>
      {isNameOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ height: 0, translateY: -30 }}
            animate={{ height: "auto", translateY: 0 }}
            exit={{ height: 0, translateY: -30 }}
            className="ml-6 text-sm flex flex-col gap-4"
          >
            <div className="flex flex-row items-center">
              <label className=" mr-5">Content Direction</label>
              <select
                className="w-3/12 py-1 px-2 bg-secondary rounded"
                value={data.content_config.content_display[0]}
                onChange={(e) =>
                  updateField({
                    content_config: {
                      content_display: [e.target.value as FlexDir],
                    },
                  })
                }
              >
                <option value="row">Row</option>
                <option value="column">Column</option>
              </select>
            </div>

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

            {/* Background Color (with popup) */}
            <BackgroundEditor
              title="Background Color"
              bgVal={data.content_config.content_background_color}
              textVal={
                data.content_config.content_background_color === undefined
                  ? "rgba(0.0.0.0,0)"
                  : data.content_config.content_background_color.replace(
                      "rgba",
                      "RGBA"
                    )
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
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
