const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Handle saving generated icons from browser
  if (req.method === 'POST' && req.url === '/save-icon') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const { size, dataUrl } = payload;
        
        if (!size || !dataUrl) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Missing size or dataUrl');
          return;
        }

        // Decode base64 PNG data
        const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
        const iconsDir = path.join(PUBLIC_DIR, 'icons');
        
        if (!fs.existsSync(iconsDir)) {
          fs.mkdirSync(iconsDir, { recursive: true });
        }

        const filePath = path.join(iconsDir, `icon-${size}.png`);
        fs.writeFileSync(filePath, base64Data, 'base64');
        console.log(`Saved icon-${size}.png to disk!`);

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Saved icon-${size}.png successfully`);
      } catch (err) {
        console.error('Error saving icon:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error: ' + err.message);
      }
    });
    return;
  }

  // Handle standard static file serving
  const reqUrl = req.url.split('?')[0];
  let filePath = path.join(PUBLIC_DIR, reqUrl === '/' ? 'index.html' : reqUrl);
  
  // Prevent directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  // Prevent serving sensitive files (git, node_modules, config, scripts)
  const relPath = path.relative(PUBLIC_DIR, filePath).replace(/\\/g, '/');
  if (
    relPath.startsWith('.git') ||
    relPath.startsWith('node_modules') ||
    relPath === 'package.json' ||
    relPath === 'package-lock.json' ||
    relPath === 'server.js' ||
    relPath === 'generate_assets.py' ||
    relPath.endsWith('.md')
  ) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error: ' + err.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Development server running at http://localhost:${PORT}`);
});
