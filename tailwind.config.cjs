/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false, // https://mui.com/material-ui/guides/interoperability/#tailwind-css
  },
  theme: {
    extend: {
      backgroundImage: {
        podcast: "url('/images/podcast.png')",
      },
      colors: {
        bgGray: '#1A1A1A',
        hoverGray: '#282828',
        pauseBlue: '#5C67DE',
        light: '#FFFFFF08',
      },
      gridTemplateColumns: {
        podcastView: '60px 1fr 60px',
      },
    },
  },
  plugins: [],
};
