import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { capitalizeFirstLetter } from "../components/functions";
import { useChatConfigContext } from "../context/chat-config-context";
import SyncToggle from "./sync-config-toggle";
import ContentConfigs from "../components/config-editors/config-group/content-configs";
import NameConfigs from "../components/config-editors/config-group/name-configs";
import MessageConfigs from "../components/config-editors/config-group/message-config";
import { AnimatePresence, motion } from "motion/react";

export function ConfigEditor() {
  const { selectedRole } = useChatConfigContext();

  const [isContentOpen, setIsContentOpen] = useState(true);
  const [isNameOpen, setIsNameOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  return (
    <motion.div
      key={selectedRole}
      initial={{ translateX: -90, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: -90, opacity: 0 }}
      transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
      className="max-h-[70vh] h-[70vh] overflow-y-scroll"
    >
      {selectedRole === "general" && <SyncToggle />}
      <div className="w-full relative bg-secondary hover:bg-secondary/60 transition-all duration-150 px-4 rounded-md mt-3">
        <h2
          className="font-bold  w-full mb-4 py-2  flex flex-row justify-between cursor-pointer items-center"
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
      </div>
      <AnimatePresence mode="wait">
        {isContentOpen && <ContentConfigs />}
      </AnimatePresence>

      <div className="w-full relative mt-8 bg-secondary hover:bg-secondary/60 transition-all duration-150 px-4 rounded-md">
        <h2
          className="font-bold  w-full mb-4 py-2  flex flex-row justify-between cursor-pointer items-center"
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
      </div>
      <AnimatePresence mode="wait">
        {isNameOpen && <NameConfigs />}
      </AnimatePresence>
      <div className="w-full relative mt-8 bg-secondary hover:bg-secondary/60 transition-all duration-150 px-4 rounded-md">
        <h2
          className="font-bold  w-full mb-4 py-2  flex flex-row justify-between cursor-pointer items-center"
          onClick={() => setIsMessageOpen(!isMessageOpen)}
        >
          {capitalizeFirstLetter(selectedRole)} Message Config
          <ChevronUp
            size={15}
            className={`${
              isMessageOpen ? "rotate-180" : ""
            } transition-transform duration-150`}
          />
        </h2>
      </div>
      <AnimatePresence mode="wait">
        {isMessageOpen && <MessageConfigs />}
      </AnimatePresence>
    </motion.div>
  );
}
