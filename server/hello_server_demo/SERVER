const express = require('express');
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;
const app = express();
const cors = require('cors');

app.listen(port, () => {
    console.log(`Server running as http://${hostname}:${port} @ ${Date(Date.now()).toString()}`);
});
app.use(express.static('../public'));