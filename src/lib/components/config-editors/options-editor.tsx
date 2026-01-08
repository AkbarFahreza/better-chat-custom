import React from "react";

interface Option {
  value: string;
  label: string;
}

interface OptionsEditorProps {
  title: string;
  val: string;
  change: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  opt: Option[];
}

function OptionsEditor({ title, val, change, opt }: OptionsEditorProps) {
  return (
    <div className="flex gap-8 flex-row items-center">
      <label>{title}</label>
      <select
        className="w-3/12 py-1 px-2 bg-secondary rounded"
        value={val}
        onChange={change}
      >
        {opt.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default OptionsEditor;
