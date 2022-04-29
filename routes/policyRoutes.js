
var express = require('express');
var router = express.Router();

var db = require('../db');

module.exports = (app) => {
  app.use('/api/v1/policy', router);

  router.get('/', async function(req, res) {
    const queryString = "SELECT * FROM policy ORDER BY id";
    
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
    const queryString = "SELECT * FROM policy WHERE id = $1";

    try {
      const result = await db.query(queryString, [parseInt(id, 10)]);

      if(result.rowCount > 0) {
        res.status(200).send(result.rows[0]); 
      } else if (result.rowCount === 0) {
        res.status(400).send([{'message': `policy id ${id} not found`}]);
      } else {
        res.status(400).send();
      }    
    } catch(e) {
      res.status(400).send({message: e.message});
    }
  });

  router.patch('/', async (req, res) => {
    try {
      const policyId = req.body.id
      const keys = Object.keys(req.body)

      let queryString, theVals, result

      // look at the keys of the request body object
      //    if we have a var that we are looking for in the keys,
      //      then we have a value for that key in req.body
      //    update the key field with the provided value
      if (keys.includes('policyNumber')) {
        queryString = `UPDATE policy SET policy_number = $1 WHERE id = $2 RETURNING *`
        theVals = [req.body.policyNumber, parseInt(policyId, 10)]
        result = await db.query(queryString, theVals);

        res.status(200).send(result.rows[0])
      } else {
        throw new Error(`Can't determine which field to update. Received ${Object.entries(req.body)} for policyId ${policyId}`)
      }
    } catch(e) {
      res.status(400).send({message: `Error in policyRoutes.patch:  ${e.message}`})
    }
  })
}
