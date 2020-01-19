const express = require('express');
const path = require('path'); //TODO: Add to demo app
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;
const app = express();
const cors = require('cors');

app.listen(port, () => {
    console.log(`Server running as http://${hostname}:${port} @ ${Date(Date.now()).toString()}`);
});
app.use(express.static('../public'));

app.get('/search', (req, res) => {
    res.sendFile(path.resolve(__dirname, ['../public/search.html', 'search_sketch.js']));
});//AAAAAAAAAAAAAAAARRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRHHHHHHHHHHHHHHHHHHHHHHHHHH