/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xxm: "380px",
        xm: "500px",
        sm: "640px",
        md: "768px",
        xd: "815px",
        xxd:"875px",
        mmd: "940px",
        ld: "1000px",
        lg: "1024px",
        lgg: "1112px",
        xl: "1280px",
        xxl: "1312px",
        "2xl": "1536px",
      },
      colors: {
        first: "#ffffff",
        second: "#f97316",
      },
      fontFamily: {
        bold: "yekBold",
        medium: "yekRegular",
        light: "yekThin",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
