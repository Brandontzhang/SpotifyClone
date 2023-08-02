export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors : {
      primary: "var(--primary-color)",
      primary200 : "var(--primary-color-200)",
      secondary : "var(--secondary-color)",

      background100 : "var(--background-color-100)",
      background200 : "var(--background-color-200)",
      background300 : "var(--background-color-300)",

      text : "var(--text-color)",
      highlight : "var(--highlight-color)"
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}