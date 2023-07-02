/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        61: "61px",
      },
      boxShadow: {
        custom: "12px 12px 27px #001321, -12px -12px 27px #00253f",
      },
      gradientColorStops: {
        custom: "#001e33, #00192b",
      },
    },
  },
  plugins: [],
};
