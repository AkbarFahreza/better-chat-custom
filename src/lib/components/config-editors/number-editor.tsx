interface NumberEditorProps {
  label: string;
  val: number;
  change: (e: any) => void;
}

function NumberEditor({ label, val, change }: NumberEditorProps) {
  return (
    <label className="flex flex-row items-center">
      <p className="config-title">{label}</p>
      <input
        type="number"
        value={val}
        onChange={change}
        className="bg-secondary mr-2 px-2 w-13 py-1 rounded"
      />
      <p>deg</p>
    </label>
  );
}

export default NumberEditor;
