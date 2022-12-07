const express = require('express');
const path = require('path');
const app = express();

const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
//const albumRoutes = require('./routes/album.routes')

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello everyone');
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));


// app.listen(3000, () => {
//     console.log('application lancée sur le port 3000');
// });

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})