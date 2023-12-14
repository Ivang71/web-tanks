import glsl from 'vite-plugin-glsl'
import { defineConfig } from 'vite'

export default defineConfig({
    base: '/web-tanks',
    plugins: [glsl()],
    server: {
        watch: {
            usePolling: true
        }
    }
})