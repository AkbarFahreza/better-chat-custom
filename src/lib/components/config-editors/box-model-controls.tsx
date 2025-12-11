import { SquareRoundCorner } from "lucide-react";

type Sides = {
  top: number;
  right: number | "auto";
  bottom: number;
  left: number | "auto";
};

interface Props {
  label: string;
  values: Sides;
  onChange: (next: Sides) => void;
  isSpacing?: boolean;
}

function BoxModelControls({ label, values, onChange, isSpacing }: Props) {
  const handleChange = (side: keyof Sides, v: string) => {
    let nextValue: number | "auto";

    if (v === "auto") {
      nextValue = "auto";
    } else if (/^-?\d+$/.test(v)) {
      nextValue = parseInt(v);
    } else {
      // Allow typing (e.g. "a", "au", "aut") without resetting input
      onChange({
        ...values,
        [side]: v as any,
      });
      return;
    }

    onChange({
      ...values,
      [side]: nextValue,
    });
  };

  const iconMap = {
    top: <SquareRoundCorner className="-rotate-90" size={14} />,
    right: <SquareRoundCorner className="" size={14} />,
    bottom: <SquareRoundCorner className="rotate-90" size={14} />,
    left: <SquareRoundCorner className="rotate-180" size={14} />,
  };

  return (
    <div className="flex flex-row items-center">
      <p className="config-title">{label}</p>
      <div className="flex flex-row gap-4">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <div key={side} className="flex flex-row gap-2 items-center">
            {isSpacing === undefined ? (
              <p className="capitalize">{side}</p>
            ) : (
              <div className="p-1 rounded bg-neutral-700">{iconMap[side]}</div>
            )}

            <input
              type="text"
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
