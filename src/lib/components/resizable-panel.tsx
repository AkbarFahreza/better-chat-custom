import React, { useRef, useState } from "react";

export default function ResizablePanels({
  children,
}: {
  children: [React.ReactNode, React.ReactNode];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [leftWidth, setLeftWidth] = useState(65); // percentage

  const startDragging = (e: React.MouseEvent) => {
    e.preventDefault();

    const container = containerRef.current;
    if (!container) return;

    const startX = e.clientX;
    const containerWidth = container.offsetWidth;

    const handleMove = (event: MouseEvent) => {
      const delta = event.clientX - startX;
      const newWidth =
        (((leftWidth / 100) * containerWidth + delta) / containerWidth) * 100;

      if (newWidth > 20 && newWidth < 80) {
        setLeftWidth(newWidth);
      }
    };

    const stopDragging = () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", stopDragging);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", stopDragging);
  };

  return (
    <div ref={containerRef} className="flex w-full h-full relative">
      <div
        style={{ width: `${leftWidth}%`, paddingRight: "16px" }}
        className="transition-none"
      >
        {children[0]}
      </div>
      <div
        onMouseDown={startDragging}
        className="w-1 cursor-col-resize bg-gray-500/40 hover:bg-gray-500/60"
      />
      <div style={{ width: `${100 - leftWidth}%` }} className="transition-none">
        {children[1]}
      </div>
    </div>
  );
}
