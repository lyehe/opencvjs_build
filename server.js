const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.wasm': 'application/wasm',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
    // Required headers for SharedArrayBuffer (threading support)
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');

    let filePath = req.url === '/' ? '/examples/browser/index.html' : req.url;
    // Handle directory paths by appending index.html
    if (filePath.endsWith('/')) {
        filePath += 'index.html';
    }
    filePath = path.join(__dirname, filePath);

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.stat(filePath, (statErr, stats) => {
        if (!statErr && stats.isDirectory()) {
            filePath = path.join(filePath, 'index.html');
        }
        fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found: ' + req.url);
            } else {
                res.writeHead(500);
                res.end('Server error: ' + err.code);
            }
        } else {
            const finalExt = path.extname(filePath).toLowerCase();
            const finalContentType = mimeTypes[finalExt] || 'application/octet-stream';
            res.writeHead(200, { 'Content-Type': finalContentType });
            res.end(content);
        }
        });
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Demo: http://localhost:${PORT}/examples/browser/`);
    console.log('');
    console.log('COOP/COEP headers enabled for SharedArrayBuffer support');
});
