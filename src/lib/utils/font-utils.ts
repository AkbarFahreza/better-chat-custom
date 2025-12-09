// utils/font-utils.ts
export function extractWeights(variants: string[]): string[] {
  return Array.from(
    new Set(
      variants
        .map((v) => {
          if (v === "regular") return "400";
          if (/^\d+$/.test(v)) return v;
          if (/^\d+italic$/.test(v)) return v.replace("italic", "");
          return null;
        })
        .filter(Boolean)
    )
  ) as string[];
}
