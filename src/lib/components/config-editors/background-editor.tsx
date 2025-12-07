import React, { useEffect, useRef, useState } from "react";
import { ChromePicker } from "react-color";

interface BackgroundEditorProps {
  val: string;
  change: (color: any) => void;
  click: () => void;
  textVal: string;
  bgVal: string;
  title: string;
}

function BackgroundEditor({
  val,
  change,
  click,
  textVal,
  bgVal,
  title,
}: BackgroundEditorProps) {
  const [showBgPicker, setShowBgPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);

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
      <label className=" mr-5">{title}</label>
      <div
        onClick={() => setShowBgPicker(!showBgPicker)}
        className="flex py-1 rounded-sm cursor-pointer px-4 bg-secondary flex-row gap-2 items-center"
      >
        <span
          style={{
            backgroundColor: bgVal,
          }}
          className="h-5 w-6 border border-white/60 "
        />
        <p>{textVal}</p>
      </div>

      {/* Popup */}
      {showBgPicker && (
        <div ref={pickerRef} className="absolute left-40 top-10 z-50 shadow-lg">
          <ChromePicker color={val} onChange={change} />
          <button
            className="cursor-pointer  w-full mt-2 px-4 py-2 bg-red-400 text-white rounded hover:bg-red-500"
            onClick={() => {
              click();
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

export default BackgroundEditor;

{
  /* <div className="flex flex-row items-center relative">
  <label className=" mr-5">Background Color</label>
  <div
    onClick={() => setShowBgPicker(!showBgPicker)}
    className="flex py-1 rounded-sm cursor-pointer px-4 bg-secondary flex-row gap-2 items-center"
  >
    <span
      style={{
        backgroundColor: data.content_config.content_background_color,
      }}
      className="h-5 w-6 border border-white/60 "
    />
    <p></p>
  </div>

  {showBgPicker && (
    <div ref={pickerRef} className="absolute left-40 top-10 z-50 shadow-lg">
      <ChromePicker
        color={data.content_config.content_background_color}
        onChange={(c) => {
          updateField({
            content_config: {
              content_background_color: `rgba(${c.rgb.r},${c.rgb.g},${c.rgb.b},${c.rgb.a})`,
            },
          });
        }}
      />
      <button
        className="cursor-pointer  w-full mt-2 px-4 py-2 bg-red-400 text-white rounded hover:bg-red-500"
        onClick={() => {
          updateField({
            content_config: {
              content_background_color: `rgba(0,0,0,0)`,
            },
          });
          setShowBgPicker(false);
        }}
      >
        Reset
      </button>
    </div>
  )}
</div>; */
}
