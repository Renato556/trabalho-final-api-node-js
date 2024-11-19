const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const routes = require('./src/main/routes');
const mongoClient = require('./db');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/movies', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT;

mongoClient.connect().then(() => {
  app.listen(port);
  console.log(`App listening on port ${port}`);
});
