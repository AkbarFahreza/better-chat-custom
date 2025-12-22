import { useState, useEffect, useRef } from "react";
import { ChromePicker } from "react-color";
import BasicChat from "./chats-component/general-chat";
import React from "react";

const MemoChat = React.memo(BasicChat);

function PreviewChat() {
  const [previewColor, setPreviewColor] = useState<string>("rgba(0,0,0,0)");
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

  const pickerRef = useRef<HTMLDivElement | null>(null);

  const handleColorChange = (color: any) => {
    const { r, g, b, a } = color.rgb;
    setPreviewColor(`rgba(${r}, ${g}, ${b}, ${a})`);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowColorPicker(false);
      }
    };
    if (showColorPicker)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showColorPicker]);

  return (
    <div
      style={{ backgroundColor: previewColor }}
      className="w-full h-[96vh] max-h-[96vh] overflow-y-scroll relative"
    >
      <div
        id="chat-preview"
        className="absolute -z-50 top-0 left-0 h-full w-full"
      ></div>
      <div className="px-4 flex flex-row justify-between py-2 font-bold mb-4 bg-secondary relative">
        <h2 className="text-base">Chat Preview</h2>
        <div className="flex flex-row items-center gap-2 relative">
          <p className="ml-2 text-sm font-normal">Preview BG</p>
          <span
            onClick={() => {
              setShowColorPicker(!showColorPicker);
              setPreviewColor("rgba(0,0,0,1)");
            }}
            style={{ backgroundColor: previewColor }}
            className="h-5 w-5 rounded-sm border border-white/60 cursor-pointer"
          />
          {showColorPicker && (
            <div
              ref={pickerRef}
              className="absolute right-0 top-10 z-50 flex flex-col p-2 rounded"
            >
              <ChromePicker color={previewColor} onChange={handleColorChange} />
              <button
                className="cursor-pointer  w-full mt-2 px-4 py-2 bg-red-400 text-white rounded hover:bg-red-500"
                onClick={() => {
                  setPreviewColor("rgba(0,0,0,0)");
                  setShowColorPicker(false);
                }}
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="px-4">
        <MemoChat role="general" />
        <MemoChat role="owner" />
        <MemoChat role="moderator" />
        <MemoChat role="member" />
      </div>
    </div>
  );
}

export default PreviewChat;
