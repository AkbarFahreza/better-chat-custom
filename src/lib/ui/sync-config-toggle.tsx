import { useChatConfigContext } from "../context/chat-config-context";

export default function SyncToggle() {
  const { syncEnabled, setSyncEnabled } = useChatConfigContext();

  return (
    <label className="flex rounded-md cursor-pointer flex-row py-2 px-4 bg-main/20 hover:bg-main/40 duration-150 transition-colors  mb-6 gap-2">
      <input
        type="checkbox"
        checked={syncEnabled}
        onChange={(e) => setSyncEnabled(e.target.checked)}
      />
      Sync this setting to all roles
    </label>
  );
}
