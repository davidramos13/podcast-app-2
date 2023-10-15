/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false, // https://mui.com/material-ui/guides/interoperability/#tailwind-css
  },
  theme: {
    extend: {
      colors: {
        bgGray: '#1A1A1A',
        pauseBlue: '#5C67DE',
      },
    },
  },
  plugins: [],
};
