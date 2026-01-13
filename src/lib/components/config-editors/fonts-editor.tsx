// components/FontEditor.tsx
import { useGoogleFonts } from "../../context/google-fonts-context";
import { extractWeights } from "../../utils/font-utils";
import { useChatConfigContext } from "../../context/chat-config-context";
import ColorEditor from "./color-editor";
import { loadGoogleFont } from "../../utils/load-google-font";
import { useEffect, useRef, useState } from "react";
import { TextAlignCenter, TextAlignEnd, TextAlignStart } from "lucide-react";

interface textTypeProps {
  textType: string;
}

export default function FontEditor({ textType }: textTypeProps) {
  const { fonts, loading } = useGoogleFonts();
  const { selectedRole, config, updateConfig } = useChatConfigContext();

  const [search, setSearch] = useState("");
  const [showFontSelector, setShowFontSelector] = useState(false);

  const selectorRef = useRef<HTMLDivElement | null>(null);

  const data = config[selectedRole];

  const FONT_MAP = {
    nameText: {
      key: "name_config",
      family: "name_font_family",
      color: "name_font_color",
      weight: "name_font_weight",
      size: "name_font_size",
      letter_spacing: "name_font_letter_spacing",
      text_align: "name_text_align",
    },
    messageText: {
      key: "message_config",
      family: "message_font_family",
      color: "message_font_color",
      weight: "message_font_weight",
      size: "message_font_size",
      letter_spacing: "message_font_letter_spacing",
      text_align: "message_text_align",
    },
  } as const;

  const alignButtons = [
    { name: "Text left", icon: <TextAlignStart size={20} />, opts: "left" },
    {
      name: "Text center",
      icon: <TextAlignCenter size={20} />,
      opts: "center",
    },
    { name: "Text right", icon: <TextAlignEnd size={20} />, opts: "right" },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(e.target as Node)
      ) {
        setShowFontSelector(false);
      }
    };
    if (showFontSelector)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFontSelector]);

  const fontcfg = FONT_MAP[textType as keyof typeof FONT_MAP];
  const activeConfig = data[fontcfg.key];

  const seletedFontType = activeConfig[fontcfg.family];
  const selectedFont = fonts.find((f) => f.family === seletedFontType);

  const updateFontField = (field: string, value: any) => {
    updateConfig(selectedRole, {
      [fontcfg.key]: {
        [field]: value,
      },
    });
  };

  const filteredFonts = fonts.filter((f) =>
    f.family.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    filteredFonts.slice(0, 8).forEach((f) => {
      const weights = extractWeights(f.variants);
      loadGoogleFont(f.family, weights);
    });
  }, [filteredFonts]);

  const weights = selectedFont ? extractWeights(selectedFont.variants) : [];

  const [setSelectedAlign] = useState<string>(fontcfg.text_align);

  if (loading) return <p>Loading Google Fonts…</p>;

  return (
    <div className="flex flex-col gap-4 mt-2">
      <p className="text-main font-bold text-lg">Font Setting</p>
      <label className="flex flex-row w-64">
        <span className="flex flex-row items-center whitespace-nowrap config-title">
          Font Family
        </span>
        <div className="relative ">
          <div
            className="py-1 px-3 rounded-md bg-secondary min-w-52"
            onClick={() => setShowFontSelector(!showFontSelector)}
          >
            <p>{selectedFont ? selectedFont.family : "Quicksand"}</p>
          </div>
          {showFontSelector && (
            <div className="absolute top-[150%] left-0 z-50">
              <input
                type="text"
                placeholder={
                  selectedFont ? selectedFont.family : "Search Fonts..."
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-background border border-white/60 min-w-52 px-2 py-1 rounded"
              />
              <div
                ref={selectorRef}
                className="bg-secondary rounded max-h-56 overflow-y-auto border border-neutral-600"
              >
                {filteredFonts.map((f) => (
                  <button
                    key={f.family}
                    onClick={() => {
                      const weights = extractWeights(f.variants);
                      loadGoogleFont(f.family, weights);
                      updateFontField(fontcfg.family, f.family);
                      setShowFontSelector(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-neutral-700"
                    style={{
                      fontFamily: `"${f.family}", sans-serif`,
                    }}
                  >
                    {f.family}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </label>

      <ColorEditor
        isBackgroundSelector={false}
        title="Font Color"
        bgVal={activeConfig[fontcfg.color]}
        textVal={activeConfig[fontcfg.color]}
        val={activeConfig[fontcfg.color]}
        change={(c) => {
          updateFontField(
            fontcfg.color,
            `rgba(${c.rgb.r},${c.rgb.g},${c.rgb.b},${c.rgb.a})`
          );
        }}
        clearColor={() => {
          updateFontField(fontcfg.color, `rgba(255,255,255,1)`);
        }}
      />

      <div className="flex flex-row gap-6">
        {/* FONT WEIGHT */}
        <label className="flex flex-row items-center">
          <p className="config-title">Font Weight</p>
          <select
            value={activeConfig[fontcfg.weight]}
            onChange={(e) => updateFontField(fontcfg.weight, e.target.value)}
            className="bg-secondary w-24 px-3 py-1 rounded"
          >
            {weights.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </label>

        {/* FONT SIZE */}
        <label className="flex flex-row gap-2 items-center">
          Size
          <input
            type="number"
            value={!activeConfig[fontcfg.size] ? 0 : activeConfig[fontcfg.size]}
            onChange={(e) =>
              updateFontField(fontcfg.size, parseInt(e.target.value))
            }
            className="bg-secondary px-2 w-13 py-1 rounded"
          />
        </label>
      </div>
      <div className="flex flex-roDw  items-center">
        <label className="config-title py-1">Letter spacing</label>
        <input
          type="number"
          step="0.1"
          value={
            !activeConfig[fontcfg.letter_spacing]
              ? 0
              : activeConfig[fontcfg.letter_spacing]
          }
          onChange={(e) =>
            updateFontField(fontcfg.letter_spacing, parseFloat(e.target.value))
          }
          className="bg-secondary px-2 w-13 py-1  rounded"
        />
        <div className="flex flex-row gap-3 ml-3">
          {alignButtons.map((item) => {
            const isSelected = activeConfig[fontcfg.text_align] === item.opts;

            return (
              <button
                className={[
                  "p-1 rounded-sm cursor-pointer transition-all duration-150",
                  isSelected ? "bg-main" : "bg-secondary hover:bg-secondary/70",
                ].join(" ")}
                key={item.name}
                onClick={() => {
                  setSelectedAlign;
                  updateFontField(fontcfg.text_align, item.opts);
                }}
              >
                {item.icon}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
