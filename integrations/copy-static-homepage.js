import fs from 'fs';
import path from 'path';

/**
 * Astro integration to copy the static homepage to the root of the build output
 */
export function copyStaticHomepage() {
	return {
		name: 'copy-static-homepage',
		hooks: {
			'astro:build:done': async ({ dir }) => {
				const sourceFile = path.join(process.cwd(), 'src', 'static', 'index.html');
				const destFile = path.join(dir.pathname, 'index.html');

				// Copy the static index.html to the root of the build output
				if (fs.existsSync(sourceFile)) {
					fs.copyFileSync(sourceFile, destFile);
					console.log('✓ Copied static homepage to build output');
				}

				// Copy robots.txt to the root of the build output
				const robotsSource = path.join(process.cwd(), 'public', 'robots.txt');
				const robotsDest = path.join(dir.pathname, 'robots.txt');

				if (fs.existsSync(robotsSource)) {
					fs.copyFileSync(robotsSource, robotsDest);
					console.log('✓ Copied robots.txt to build output');
				}
			}
		}
	};
}
