var express = require('express');
var router = express.Router();

var db = require('../db');
// const { isAuthenticated } = require('../loaders/passportLoader');

module.exports = (app) => {
  app.use('/api/v1/policy-status', router);

  router.get('/', async function(req, res) {
    const queryString = "SELECT * FROM policy_status";
    
    try {
      const result = await db.query(queryString);

      if(result) {
        res.status(200).json(result.rows);
      } else {
        res.status(400).send();
      }   
    } catch(e) {
      res.status(400).send({message: e.message});
    }
  });

  router.get('/:id', async function(req, res) {
    const { id } = req.params;
    const queryString = "SELECT * FROM policy_status WHERE id = $1";

    try {
      const result = await db.query(queryString, [parseInt(id, 10)]);

      if(result.rowCount > 0) {
        res.status(200).send(result.rows[0]); 
      } else if (result.rowCount === 0) {
        res.status(400).send([{'message': `policy status id ${id} not found`}]);
      } else {
        res.status(400).send();
      }    
    } catch(e) {
      res.status(400).send({message: e.message});
    }
  });
}
