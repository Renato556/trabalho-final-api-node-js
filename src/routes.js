const router = require('express');

const routes = router();

routes.get('/', (req, res) => {
    res.send('Hello World')
});

module.exports = routes;
