const express = require('express');
const dotenv = require('dotenv');
const routes = require("./src/routes");

dotenv.config();

const app = express();
app.use(express.json());
app.use('/movies', routes);

const port = process.env.PORT;
app.listen(port);
console.log(`App listening on port ${port}`);
