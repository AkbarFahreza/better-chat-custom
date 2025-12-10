// components/FontEditor.tsx
import { useGoogleFonts } from "../../context/google-fonts-context";
import { extractWeights } from "../../utils/font-utils";
import { useChatConfig } from "../../context/chat-config-context";
import ColorEditor from "./color-editor";
import { loadGoogleFont } from "../../utils/load-google-font";
import { useEffect, useRef, useState } from "react";

export default function FontEditor() {
  const { fonts, loading } = useGoogleFonts();
  const { selectedRole, config, updateConfig } = useChatConfig();

  const [search, setSearch] = useState("");
  const [showFontSelector, setShowFontSelector] = useState(false);

  const selectorRef = useRef<HTMLDivElement | null>(null);

  const data = config[selectedRole];

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
  // Font Fams Selector

  const selectedFont = fonts.find(
    (f) => f.family === data.name_config.name_font_family
  );

  const filteredFonts = fonts.filter((f) =>
    f.family.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    filteredFonts.slice(0, 8).forEach((f) => {
      const weights = extractWeights(f.variants);
      loadGoogleFont(f.family, weights);
    });
  }, [filteredFonts]);

  // Value updater
  const updateField = (field: Partial<typeof data>) => {
    updateConfig(selectedRole, {
      ...data,
      ...field,
    });
  };

  const weights = selectedFont ? extractWeights(selectedFont.variants) : [];

  console.log(showFontSelector);
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
                      updateConfig(selectedRole, {
                        name_config: {
                          name_font_family: f.family,
                        },
                      });
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
        title="Font Color"
        bgVal={data.name_config.name_font_color}
        textVal={data.name_config.name_font_color}
        val={data.name_config.name_font_color}
        change={(c) => {
          updateField({
            name_config: {
              name_font_color: `rgba(${c.rgb.r},${c.rgb.g},${c.rgb.b},${c.rgb.a})`,
            },
          });
        }}
        click={() => {
          updateField({
            name_config: {
              name_font_color: "rgba(0.0.0.0,0)",
            },
          });
        }}
      />

      <div className="flex flex-row gap-6">
        {/* FONT WEIGHT */}
        <label className="flex flex-row items-center">
          <p className="config-title">Font Weight</p>
          <select
            value={data.name_config.name_font_weight}
            onChange={(e) =>
              updateConfig(selectedRole, {
                name_config: {
                  name_font_weight: e.target.value,
                },
              })
            }
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
            value={data.name_config.name_font_size}
            onChange={(e) =>
              updateConfig(selectedRole, {
                name_config: {
                  name_font_size: parseInt(e.target.value),
                },
              })
            }
            className="bg-secondary px-2 w-13 py-1 rounded"
          />
        </label>
      </div>
    </div>
  );
}
