import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		},

		vite: {
			resolve: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
				alias: {
                    // these are the aliases and paths to them
					'@lib': path.resolve('./src/lib'),
					'@util': path.resolve('./src/util'),
					'@type': path.resolve('./src/type')
				}
			}
		}
	}
};

export default config;
