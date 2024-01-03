import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // theme: {
  //   extend: {
  //     backgroundImage: {
  //       "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
  //       "gradient-conic":
  //         "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
  //     },
  //     colors: {
  //       transparent: "transparent",
  //       black: colors.black,
  //       white: colors.white,
  //       gray: colors.gray,
  //       emerald: colors.emerald,
  //       indigo: colors.indigo,
  //       yellow: colors.yellow,
  //       mainGreen: "#7eb179",
  //       mainBlack: "#0f1317",
  //     },
  //   },
  // },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
  daisyui: {
    themes: ["light", "dark", "lofi"],
  },
};
export default config;
