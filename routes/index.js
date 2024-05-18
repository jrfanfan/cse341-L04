const routes = require('express').Router();
const temple = require('./contacts');

routes.use('/temples', temple);
routes.use(
  '/',
  (docData = (req, res) => {
    let docData = {
      documentationURL: '',
    };
    res.send(docData);
  })
);

module.exports = routes;
