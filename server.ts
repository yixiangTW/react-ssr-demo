const express = require('express')
const React = require('react')
const ReactDOMServer = require('react-dom/server')

const fs = require('fs')
const path = require('path')
const App = require('./src/App').default

const app = express()

app.use('/dist', express.static('dist'));

app.get('/', (req: any, res: any) => {
  const html = ReactDOMServer.renderToString(React.createElement(App));
  fs.readFile(path.resolve(__dirname, 'index.html'), 'utf8', (err: any, data: any) => {
    if (err) {
      console.error('Error reading template:', err);
      return res.status(500).send('Server Error');
    }
    const renderedHtml = data.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
    res.send(renderedHtml);
  });
});

app.get('/api/data', (req: any, res: any) => {
  const jsonData = {
    message: 'Hello, world!',
    data: {
      name: 'John',
      age: 30
    }
  };
  res.json(jsonData)
})


app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})