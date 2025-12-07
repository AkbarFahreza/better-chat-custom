import { useChatConfig } from "../context/chat-config-context";

export default function SyncToggle() {
  const { syncEnabled, setSyncEnabled } = useChatConfig();

  return (
    <label className="flex cursor-pointer flex-row py-2 px-4 bg-secondary rounded-md mb-6 gap-2">
      <input
        type="checkbox"
        checked={syncEnabled}
        onChange={(e) => setSyncEnabled(e.target.checked)}
      />
      Sync this setting to all roles
    </label>
  );
}
