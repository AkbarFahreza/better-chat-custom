import { useState } from "react";
import TabButton from "../ui/tab-button";
import { useChatConfig } from "../context/chat-config-context";
import type { Role } from "../types/chat-config";
import { ConfigEditor } from "../ui/config-editor";
import { capitalizeFirstLetter } from "./functions";

const roles: Role[] = ["general", "owner", "moderator", "member"];

function ConfigSection() {
  const [activeTab, setActiveTab] = useState("Basic Chat");
  const { selectedRole, setSelectedRole } = useChatConfig();
  return (
    <div className=" min-h-[85vh]">
      <div className="flex flex-row gap-4 border-b border-white/60 pb-4">
        <TabButton
          name="Basic Chat"
          isActive={activeTab === "Basic Chat"}
          onClik={() => setActiveTab("Basic Chat")}
        />
        <TabButton
          name="Event Chat"
          isDisabled={true}
          isActive={activeTab === "Event Chat"}
          onClik={() => setActiveTab("Event Chat")}
        />
      </div>
      <div className="flex flex-row gap-3 mt-4 mb-4">
        {roles.map((r) => (
          <TabButton
            key={r}
            name={capitalizeFirstLetter(r)}
            isActive={selectedRole === r}
            onClik={() => setSelectedRole(r)}
          />
        ))}
      </div>
      <div className="mt-4">
        {activeTab === "Basic Chat" ? (
          <div>
            <ConfigEditor />
          </div>
        ) : (
          <div>
            <p className="opacity-60">Not implemented</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConfigSection;
