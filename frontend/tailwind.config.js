/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        poppinsBold: ["PoppinsBold", "sans-serif"],
      },
      colors: {
        Primary : "#74B04C",
        Secondary : "#4D434C",
        buttonPrimary: "#7CB342",
        textPrimary : "#74B04C",
        textSecondary : "#8B8B8B",
        textColor : "#4E424C"

      }
    },
  },
  plugins: [],
}