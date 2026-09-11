/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0E1424",
        inkSoft: "#4A5168",
        inkFaint: "#7C8397",

        // Solid blues, pulled from the dark end of the gradient so white text still passes.
        brand: "#2246C7",
        brandSoft: "#1668C4",
        brandTint: "#E9F2FD",

        // The three gradient stops.
        gradFrom: "#3452D6",
        gradMid: "#1C8BE6",
        gradTo: "#17C3D4",
        cyan: "#17C3D4",

        // Highlight yellow. accentPale sits on the gradient, accentInk on white.
        accent: "#F2A413",
        accentPale: "#FBEFA8",
        accentInk: "#B97B06",
        accentTint: "#FDF3DF",

        // The magenta pill.
        magenta: "#B43BD8",
        magentaSoft: "#E14FC0",
        magentaDeep: "#8B2FB8",

        mist: "#F4F7FB",
        mistDeep: "#E6ECF5",
        line: "#DCE3EE",
        ghost: "#E9EEF6",

        ok: "#1F7A54",
        alert: "#C0392B",

        night: "#0C1424",
        nightSoft: "#16203A",
        nightLine: "#26314F",
      },
      fontFamily: {
        display: ["var(--font-display)", "var(--font-tamil)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "var(--font-tamil)", "system-ui", "sans-serif"],
        tamil: ["var(--font-tamil)", "var(--font-display)", "sans-serif"],
      },
      borderRadius: {
        phone: "2.4rem",
      },
      boxShadow: {
        device: "0 40px 90px -35px rgba(8, 20, 45, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.12)",
        card: "0 18px 40px -24px rgba(14, 20, 36, 0.35)",
        raised: "0 14px 34px -16px rgba(14, 20, 36, 0.18)",
      },
    },
  },
  plugins: [],
};
