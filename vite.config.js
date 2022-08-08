import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import { existsSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
// Get working directory root
const PROJECT_ROOT = dirname(fileURLToPath(import.meta.url))
// Function to check for local config from local var
function localConfigOptional(name) {
	const path = resolve(PROJECT_ROOT, 'var', name)
	if (existsSync(path)) {
		const data = readFileSync(path).toString().trim() || undefined
		console.log(`>> Using local config [${name}]: ${data}`)
		try {
			return JSON.parse(readFileSync(path))
		} catch (e) {
			return data
		}
	}
}
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	publicDir: './common/public',
	resolve: {
		// eslint-disable-next-line spellcheck/spell-checker
		dedupe: ['vue'],
		alias: {
			'@': resolve(__dirname),
			'@C': resolve(__dirname, './common'),
			'@CR': resolve(__dirname, './common/res'),
			'@CL': resolve(__dirname, './common/lib'),
			'@CS': resolve(__dirname, './common/store'),
			'@CC': resolve(__dirname, './common/components'),
		},
	},
	server: {
		host: true,
		hmr: {
			port: localConfigOptional('HMR_PORT')
		}
	}
})