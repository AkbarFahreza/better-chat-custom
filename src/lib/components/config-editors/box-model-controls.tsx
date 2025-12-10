type Sides = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

interface Props {
  label: string;
  values: Sides;
  onChange: (next: Sides) => void;
}

function BoxModelControls({ label, values, onChange }: Props) {
  const handleChange = (side: keyof Sides, v: string) => {
    onChange({
      ...values,
      [side]: parseInt(v) || 0,
    });
  };
  return (
    <div className="flex flex-row items-center">
      <p className="config-title">{label}</p>
      <div className="flex flex-row gap-4">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <div key={side} className="flex flex-row gap-2 items-center">
            <p className="capitalize">{side}</p>
            <input
              type="number"
              className="w-13 text-center py-px px-2 bg-secondary rounded"
              value={values[side]}
              onChange={(e) => handleChange(side, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoxModelControls;
