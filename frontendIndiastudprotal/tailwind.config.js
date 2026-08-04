/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'top-strong': '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)',
        'custom-all': '0 0 15px rgba(0, 0, 0, 0.9)',
        'all-strong': '0 0 15px 3px rgba(0, 0, 0, 0.15)',
        'inner-black-25': 'inset 0 0 15px 2px rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #4c3f4f, #3a333f, #2a262e, #1c1b1f, #0d0d0d)',
        'violet-gradient': "radial-gradient(circle at 10% 20%, rgb(186, 190, 245) 0%, rgb(192, 192, 245) 33.1%, rgb(195, 191, 246) 90%)",
      },
      fontSize: {
        SidebarData: '16px', 
        extra: '22px',  
      },
      colors: {
        'custom-indigo': 'rgba(48,94,172,1)',
      },
    },
  },
  plugins: [],
}
