/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'stars-background': "url('/public/pictures/pexels-instawalli-176851.jpg')",
        'planets-background': "url('/public/pictures/pexels-alex-andrews-1983032.jpg')",
        'solarSystem-background': "url('/public/pictures/solar-system-in-a-row-tqqz1cv6ba10znyf.jpg')",
        'blackhole-background': "url('/public/pictures/High_resolution_wallpaper_background_ID_77701924272.webp')"

      }
      
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

