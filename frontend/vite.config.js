// import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { LogOut } from 'lucide-react'

export default defineConfig({
  plugins: [
    tailwindcss(), react()
  ],
})

// ProfilePage, LogOut
// signup
// login
