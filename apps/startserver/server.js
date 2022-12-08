import express from 'express';
const path = require('path');

const app = express();

app.use(express.static(path.resolve(path.resolve(), 'dist', 'apps', 'frontend')));

app.get('*', (req, res) => {
  res.sendFile('index.html', err => {
    if (err) console.log(err);
  });
  res.end();
});

app.listen(3089)
