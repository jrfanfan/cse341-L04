const routes = require('express').Router();
const temple = require('./contacts');

routes.use('/temples', temple);
routes.use(
  '/',
  (docData = (req, res) => {
    let docData = {
      documentationURL: 'https://explore.swaggerhub.com/',
    };
    res.send(docData);
  })
);

module.exports = routes;
