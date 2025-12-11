import { useState } from "react";
import TabButton from "../ui/tab-button";
import { useChatConfig } from "../context/chat-config-context";
import type { Role } from "../types/chat-config";
import { ConfigEditor } from "../ui/config-editor";
import { capitalizeFirstLetter } from "./functions";
import { Code } from "lucide-react";
import CSSOutput from "./config-editors/css-output/css-output";

const roles: Role[] = ["general", "owner", "moderator", "member"];

function ConfigSection() {
  const [activeTab, setActiveTab] = useState("Basic Chat");
  const { selectedRole, setSelectedRole } = useChatConfig();
  return (
    <div className=" min-h-[85vh]">
      <div className="flex flex-row gap-4 border-b border-white/60 pb-4">
        <TabButton
          isActive={activeTab === "Basic Chat"}
          onClick={() => setActiveTab("Basic Chat")}
        >
          <p>Basic Chat</p>
        </TabButton>
        <TabButton
          isDisabled={true}
          isActive={activeTab === "Event Chat"}
          onClick={() => setActiveTab("Event Chat")}
        >
          <p>Event Chat</p>
        </TabButton>
        <TabButton
          isActive={activeTab === "Show CSS"}
          onClick={() => setActiveTab("Show CSS")}
          classnames="bg-secondary rounded-sm flex flex-row items-center px-4"
        >
          <Code size={20} /> <p>Show CSS</p>
        </TabButton>
      </div>
      {activeTab === "Basic Chat" ? (
        <div className="flex flex-row gap-3 mt-4 mb-4">
          {roles.map((r) => (
            <TabButton
              key={r}
              isActive={selectedRole === r}
              onClick={() => setSelectedRole(r)}
            >
              {capitalizeFirstLetter(r)}
            </TabButton>
          ))}
        </div>
      ) : (
        activeTab === "Event Chat" && <div>I am to lazy to build this</div>
      )}
      <div className="mt-4">
        {activeTab === "Basic Chat" ? (
          <ConfigEditor />
        ) : activeTab === "Event Chat" ? (
          <div>Event Chat</div>
        ) : activeTab === "Show CSS" ? (
          <CSSOutput />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ConfigSection;
