const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// index route
app.get('/', (req, res) => {
  // get the index.html file and send it to the browser
  const pathToHtmleFile = path.resolve(__dirname, '../dist/index.html');
  const contentFromHtmlFile = fs.readFileSync(pathToHtmleFile, 'utf-8');

  res.send(contentFromHtmlFile);
});

// route to serve static files
// update the publicPath in the webpack config to '/static/' for this to work
// without this, express doesn't know how to handle static assets.
app.use('/static', express.static(path.resolve(__dirname, '../dist')));

app.listen(3000, () => {
  console.log('Express app is running on http://localhost:3000');
});
