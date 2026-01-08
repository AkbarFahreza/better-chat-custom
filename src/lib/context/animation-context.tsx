import { useEffect } from "react";

/* =========================
   Keyframes source of truth
========================= */

export const animationKeyframesMap: Record<string, string> = {
  fade_in_to_top_anim: `
@keyframes fade_in_to_top_anim {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
}
`,
  fade_in_to_bottom_anim: `
@keyframes fade_in_to_bottom_anim {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
}
`,
  fade_in_to_right_anim: `
@keyframes fade_in_to_right_anim {
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }
  50% {
    opacity: 1;
    transform: translateX(0);
  }
}
`,
  fade_in_to_left_anim: `
@keyframes fade_in_to_left_anim {
  0% {
    opacity: 0;
    transform: translateX(50px);
  }
  50% {
    opacity: 1;
    transform: translateX(0);
  }
}
`,
};

export type AnimationName = keyof typeof animationKeyframesMap;

/* =========================
   NEW hook (used where needed)
========================= */

export function useAnimationStyles(activeAnimations: AnimationName[]) {
  useEffect(() => {
    const styleId = "chat-animation-styles";
    let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;

    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    styleEl.textContent = activeAnimations
      .map((name) => animationKeyframesMap[name])
      .filter(Boolean)
      .join("\n");

    return () => {
      styleEl!.textContent = "";
    };
  }, [activeAnimations]);
}

/* =========================
   BACKWARD-COMPAT EXPORT
========================= */

function AnimationContext() {
  const animationOpts = [
    { value: "fade_in_to_top_anim", label: "Fade in to top" },
    { value: "fade_in_to_bottom_anim", label: "Fade in to bottom" },
    { value: "fade_in_to_right_anim", label: "Fade in to right" },
    { value: "fade_in_to_left_anim", label: "Fade in to left" },
  ];

  return { animationOpts };
}

export default AnimationContext;
