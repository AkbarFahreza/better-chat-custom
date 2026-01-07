import { useEffect, useRef, useState } from "react";
import { ChromePicker } from "react-color";

interface ColorEditorProps {
  val: string;
  change: (color: any) => void;
  selecting?: () => void;
  clearColor: () => void;
  textVal: string;
  bgVal: string;
  title: string;
  isBackgroundSelector: boolean;
}

function ColorEditor({
  val,
  change,
  clearColor,
  textVal,
  bgVal,
  title,
  selecting,
  isBackgroundSelector,
}: ColorEditorProps) {
  const [showBgPicker, setShowBgPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);

  const [isUsingBackground, setIsUsingBackground] = useState(false);

  // close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowBgPicker(false);
      }
    };
    if (showBgPicker)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showBgPicker]);

  return (
    <div className="flex flex-row items-center relative">
      <label className="config-title py-1">{title}</label>
      {isBackgroundSelector && (
        <input
          type="checkbox"
          className="scale-125 mr-6"
          checked={isUsingBackground}
          onClick={isUsingBackground === true ? clearColor : selecting}
          onChange={() => {
            setIsUsingBackground(!isUsingBackground);
          }}
        />
      )}

      {isUsingBackground && (
        <div
          onClick={() => setShowBgPicker(!showBgPicker)}
          className={` flex py-1 rounded-sm cursor-pointer px-4 bg-secondary flex-row gap-2 items-center`}
        >
          <span
            style={{
              backgroundColor: bgVal,
            }}
            className="h-5 w-5  border border-white/60 "
          />
          <p>{textVal}</p>
        </div>
      )}
      {!isBackgroundSelector && (
        <div
          onClick={() => setShowBgPicker(!showBgPicker)}
          className={` flex py-1 rounded-sm cursor-pointer px-4 bg-secondary flex-row gap-2 items-center`}
        >
          <span
            style={{
              backgroundColor: bgVal,
            }}
            className="h-5 w-5  border border-white/60 "
          />
          <p>{textVal}</p>
        </div>
      )}
      {/* Popup */}
      {showBgPicker && (
        <div ref={pickerRef} className="absolute left-32 top-10 z-50 shadow-lg">
          <ChromePicker color={val} onChange={change} />
          <button
            className="cursor-pointer  w-full mt-2 px-4 py-2 bg-red-400 text-white rounded hover:bg-red-500"
            onClick={() => {
              clearColor();
              setShowBgPicker(false);
            }}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export default ColorEditor;
