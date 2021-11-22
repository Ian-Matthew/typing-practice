module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        // display: ["Jost"],
        display: ["Helvetica", "sans-serif"],
        fancy: ["Garamond", "serif"],
        // fancy: ["Cutiv"],
      },
      animation: {
        score: "score .6s ease-in-out",
        "score-perfect": "score .4s ease-in-out .1s",
        typo: "shake .7s cubic-bezier(.36,.07,.19,.97) both",
      },
      keyframes: {
        shake: {
          "10%, 90%": {
            transform: "translate3d(-1px, 0, 0)",
          },

          "20%, 80%": {
            transform: "translate3d(2px, 0, 0)",
          },

          "30%, 50%, 70%": {
            transform: "translate3d(-4px, 0, 0)",
          },

          "40%, 60%": {
            transform: "translate3d(4px, 0, 0)",
          },
        },
        score: {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "0",
          },

          "50%": {
            transform: "scale(2)",
            opacity: "1",
          },
          "75%": {
            opacity: ".2",
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
