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

      background : "var(--background-color)",
      backgroundLite : "var(--background-color-lite)",
      backgroundDark : "var(--background-color-dark)",

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