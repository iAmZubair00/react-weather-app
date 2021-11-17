module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
      },
      colors: {
        darkBlue: "#100E1D",
        lightBlue: "#1E213A",
        darkGrayBorder: "#616475",
        lessDarkBlue: "#110E3C",
        customWhite: "#E7E7EB",
        customYellow: "#FFEC65",
        bluishGray: "#585676",
        grayBG: "#6E707A",
        blueBG: "#3C47E9",
        textColor: "#A09FB1",
      },
      backgroundImage: {
        cloudsBG: "url(../assets/images/Cloud-background.png)",
      },
      spacing: {
        "2px": "2px",
        "6%": "6%",
        "30%": "30%",
        "70%": "70%",
      },
      minWidth: {
        "136px": "136px",
      },
      maxWidth: {},
      flexGrow: {},
      gridTemplateColumns: {
        dayCards: "repeat(auto-fit,minmax(133px, 1fr))",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
