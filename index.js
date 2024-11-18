const express = require('express');
const dotenv = require('dotenv');
const routes = require("./src/routes");

dotenv.config();

const index = express();
index.use(express.json());
index.use('/movies', routes);

const port = process.env.PORT;
index.listen(port);
console.log(`App listening on port ${port}`);
