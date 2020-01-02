const express = require('express');
const consola = require('consola');

require('dotenv').config();

const apiController = require('./controllers/api');
const ghostController = require('./controllers/ghost');
const nuxtController = require('./controllers/nuxt');

const redirectToTheMainHostMiddleware = require('./middleware/redirectToMainHostMiddleware');

const app = express();

app.use(redirectToTheMainHostMiddleware);

app.use('/', ghostController);

/* V8 is our custom API, not to mess with ghost api, available (proxied) at /api/v2 */
app.use('/api/v8', apiController);

app.use('/', nuxtController);

/* Run express */
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;
app.set('port', port);
app.listen(port, host);

consola.ready({
  message: `Server listening on http://${host}:${port}`,
  badge: true,
});
