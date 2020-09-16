
const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.send("hello world\n");
});


app.listen(port, (err) => {
  console.log(`App started at 0.0.0.0:${port}`);
});
