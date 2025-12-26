import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { capitalizeFirstLetter } from "../components/functions";
import { useChatConfig } from "../context/chat-config-context";
import SyncToggle from "./sync-config-toggle";
import ContentConfigs from "../components/config-editors/config-group/content-configs";
import NameConfigs from "../components/config-editors/config-group/name-configs";
import MessageConfigs from "../components/config-editors/config-group/message-config";

export function ConfigEditor() {
  const { selectedRole } = useChatConfig();

  const [isContentOpen, setIsContentOpen] = useState(true);
  const [isNameOpen, setIsNameOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  return (
    <div className="max-h-[70vh] h-[70vh] overflow-y-scroll">
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
      {isContentOpen && <ContentConfigs />}

      <div className="w-full relative mt-8">
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
      {isNameOpen && <NameConfigs />}
      <div className="w-full relative mt-8">
        <h2
          className="font-bold bg-background w-fit mb-4 py-2 pr-4  flex flex-row gap-3 cursor-pointer items-center"
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
        <span className="w-full h-px bg-white/40 absolute top-1/2 -translate-y-1/2 left-0 -z-10"></span>
      </div>
      {isMessageOpen && <MessageConfigs />}
    </div>
  );
}
