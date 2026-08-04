import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/proxy": {
        target: "https://lodestar.guru:8443",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, ""),
      },
    },
  },
});

// // locally working code
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   // server: {
//   //   host: true,
//   //   hmr: {
//   //     clientPort: 3000, // Use a different port than the one Vite is running on
//   //   },
//   // },

//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://lodestar.guru:8443',
//         changeOrigin: true,
//         rewrite: path => path.replace(/^\/api/, '')
//       }
//     }
//   },
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks(id) {
//           if (id.includes('node_modules')) {
//             // Split vendor modules into a separate chunk
//             return 'vendor';
//           }
//         }
//       }
//     },
//     chunkSizeWarningLimit: 2000,
//   }
// })
