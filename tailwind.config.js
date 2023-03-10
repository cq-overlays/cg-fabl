module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Figtree", "ui-sans-serif"],
        mono: ["Space Mono", "ui-monospace"],
      },
      colors: {
        fabl: {
          gold: "#FFD628",
          pink: {
            DEFAULT: "#FF298F",
            dark: "#E20084",
          },
          indigo: {
            DEFAULT: "#490089",
            light: "#7F36E8",
            dark: "#3B0970",
            darker: "#2a0050",
          },
        },
      },
    },
  },
  plugins: [],
}
