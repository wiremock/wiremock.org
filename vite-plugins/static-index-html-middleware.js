import fs from 'fs';
import path from 'path';

/**
 * Vite plugin to serve index.html files for /2.x/ paths and root path during development.
 * This middleware handles URLs that end with / or have no extension,
 * attempting to serve the corresponding index.html file.
 */
export function staticIndexHtmlMiddleware() {
	return {
		name: 'static-index-html-middleware',
		configureServer(server) {
			// Watch the static index.html file and trigger full reload on changes
			const staticIndexPath = path.join(process.cwd(), 'src', 'static', 'index.html');
			server.watcher.add(staticIndexPath);

			server.watcher.on('change', (file) => {
				if (file === staticIndexPath) {
					server.ws.send({
						type: 'full-reload',
						path: '/'
					});
				}
			});

			server.middlewares.use((req, res, next) => {
				// Handle root path
				if (req.url === '/' || req.url === '/?') {
					const filePath = path.join(process.cwd(), 'src', 'static', 'index.html');

					// Check if index.html exists
					if (fs.existsSync(filePath)) {
						// Read file fresh on each request to pick up changes
						const content = fs.readFileSync(filePath, 'utf-8');
						res.setHeader('Content-Type', 'text/html');
						res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
						res.end(content);
						return;
					}
				}

				// Handle /2.x/ paths
				if (req.url && req.url.startsWith('/2.x/')) {
					const urlPath = req.url.split('?')[0];

					// If URL ends with / or has no extension, try to serve index.html
					if (urlPath.endsWith('/') || !urlPath.match(/\.[a-zA-Z0-9]+$/)) {
						const indexPath = urlPath.endsWith('/')
							? `${urlPath}index.html`
							: `${urlPath}/index.html`;
						const filePath = path.join(process.cwd(), 'public', indexPath);

						// Check if index.html exists
						if (fs.existsSync(filePath)) {
							req.url = indexPath;
						}
					}
				}
				next();
			});
		}
	};
}
