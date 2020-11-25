const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// index route
app.get('/', (req, res) => {
  // get the index.html file and send it to the browser
  const pathToHtmleFile = path.resolve(__dirname, '../dist/helloWorld.html');
  const contentFromHtmlFile = fs.readFileSync(pathToHtmleFile, 'utf-8');
  res.send(contentFromHtmlFile);
});

// for this application we've set the publicPath to the full localhost
// domain so that we can share modules with ModuleFederation, so here
// we're defining '/' as the location for static files
app.use('/', express.static(path.resolve(__dirname, '../dist')));

// use a unique port for each app
app.listen(9001, () => {
  console.log('Express app is running on http://localhost:9001');
});
