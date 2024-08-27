const http = require('http');
const fs = require('fs');
const path = require('path');

// Function to serve the HTML file
function serveFile(response, filePath, contentType, responseCode = 200) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('500 - Internal Server Error');
        } else {
            response.writeHead(responseCode, { 'Content-Type': contentType });
            response.end(data);
        }
    });
}

// Create the server
const server = http.createServer((req, res) => {
    let filePath = '';
    switch (req.url) {
        case '/':
            filePath = 'index.html';
            break;
        case '/about':
            filePath = 'about.html';
            break;
        case '/contact-me':
            filePath = 'contact-me.html';
            break;
        default:
            filePath = '404.html';
            break;
    }

    const fullPath = path.join(__dirname, filePath);
    serveFile(res, fullPath, 'text/html');
});

// Start the server
const port = 8080;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
