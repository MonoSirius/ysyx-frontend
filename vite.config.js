import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	publicDir: './common/public',
	resolve: {
		// eslint-disable-next-line spellcheck/spell-checker
		dedupe: ['vue'],
		alias: {
			'@': path.resolve(__dirname),
			'@C': path.resolve(__dirname, './common'),
			'@CR': path.resolve(__dirname, './common/res'),
			'@CL': path.resolve(__dirname, './common/lib'),
			'@CS': path.resolve(__dirname, './common/store'),
			'@CC': path.resolve(__dirname, './common/components'),
		},
	},
	server: {
		host: true,
		hmr: {
			port: 443
		}
	}
})