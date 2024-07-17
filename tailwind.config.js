/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "bgColor": '#131314',
        "sidebarBg": "#1E1F20",
        "textBg": "#004A77",
      },
      textColor: {
        textC: "#444746",
        
      },
    },
  },
  plugins: [],
}

