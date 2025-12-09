export function loadGoogleFont(family: string, weights: string[]) {
  const id = `gf-${family.replace(/\s+/g, "-")}`;

  // Prevent duplicate <link>
  if (document.getElementById(id)) return;

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";

  const w = weights.join(";");
  link.href = `https://fonts.googleapis.com/css2?family=${family.replace(
    / /g,
    "+"
  )}:wght@${w}&display=swap`;

  document.head.appendChild(link);
}
