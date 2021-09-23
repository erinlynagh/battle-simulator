module.exports = {
  purge: [
    "./components/**/*.js",
    "./components/**/**/.js",
    "./pages/*.js",
    "./pages/**/*.js",
  ],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ["HackNF"],
      serif: ["HackNF"],
      mono: ["HackNF"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
