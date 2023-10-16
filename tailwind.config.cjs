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
        playerLong: '110px 2fr 266px 3fr 1fr',
        playerShort: '110px 1fr 266px',
        controls: '24px 24px 50px 24px 24px',
      },
    },
  },
  plugins: [],
};
