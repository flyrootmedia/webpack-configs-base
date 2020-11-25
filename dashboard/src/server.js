const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// set the static asset path
app.use('/', express.static(path.resolve(__dirname, '../dist')));

// tell express to serve up the dashboard.html page no matter which url
// is in the address bar (see 'historyApiFallback' in the weback configs, too)
app.get('*', (req, res) => {
  const pathToHtmlFile = path.resolve(__dirname, '../dist/dashboard.html');
  const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8');
  res.send(contentFromHtmlFile);
});

app.listen(9000, () => {
  console.log('Application is running on http://localhost:9000');
});
