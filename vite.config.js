import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';


//todo: https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: '/airplane-model-store3-state2-form1-lifeCycle-HTTPrequests-Hooks/', //! <-- ім'я репозиторію
//   //! Налаштування Аліасів для абсолютних шляхів імпортів
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'src'),
//     },
//   },
// });

//! Налаштування Vite
//todo: https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  //! Ім'я репозиторію для GitHub Pages
  base: '/airplane-model-store3-state2-form1-lifeCycle-HTTPrequests-Hooks/',

  //! Налаштування аліасів для абсолютних шляхів імпортів
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
});
