import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	base: '/vite-react-ts-gh-pages/',
	resolve: {
		alias: {
			// https://github.com/tabler/tabler-icons/issues/1233#issuecomment-2428245119
			'@tabler/icons-react':
				'@tabler/icons-react/dist/esm/icons/index.mjs'
		}
	}
})
