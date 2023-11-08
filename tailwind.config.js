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
        'blackhole-background': "url('/public/pictures/High_resolution_wallpaper_background_ID_77701924272.webp')",
      }
      
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

