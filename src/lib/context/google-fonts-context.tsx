import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";

export interface GoogleFont {
  family: string;
  variants: string[];
}

interface GoogleFontsContextValue {
  fonts: GoogleFont[];
  loading: boolean;
}

const GoogleFontsContext = createContext<GoogleFontsContextValue>({
  fonts: [],
  loading: true,
});

export function GoogleFontsProvider({ children }: { children: ReactNode }) {
  const [fonts, setFonts] = useState<GoogleFont[]>([]);
  const [loading, setLoading] = useState(true);

  const apiKey = import.meta.env.VITE_GOOGLE_FONT_API_KEY;

  useEffect(() => {
    const cached = localStorage.getItem("google_fonts_cache");

    // 1. Load from cache
    if (cached) {
      setFonts(JSON.parse(cached));
      setLoading(false);
      return;
    }

    // 2. Otherwise fetch once from API
    const fetchFonts = async () => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}`
        );

        const data: GoogleFont[] = res.data.items.map((item: any) => ({
          family: item.family,
          variants: item.variants,
        }));

        // Save to state
        setFonts(data);

        // Save to local storage (prevent future API calls)
        localStorage.setItem("google_fonts_cache", JSON.stringify(data));
      } finally {
        setLoading(false);
      }
    };

    fetchFonts();
  }, []);

  return (
    <GoogleFontsContext.Provider value={{ fonts, loading }}>
      {children}
    </GoogleFontsContext.Provider>
  );
}

export const useGoogleFonts = () => useContext(GoogleFontsContext);
