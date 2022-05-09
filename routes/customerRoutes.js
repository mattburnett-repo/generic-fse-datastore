
var express = require('express');
var router = express.Router();

var db = require('../db');

module.exports = (app) => {
  app.use('/api/v1/customer', router);

  router.get('/', async function(req, res) {
    const queryString = "SELECT * FROM customer ORDER BY id";
    
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

  router.get('/:id',  async function(req, res) {
    const { id } = req.params;
    const queryString = "SELECT * FROM customer WHERE id = $1";

    try {
      const result = await db.query(queryString, [parseInt(id, 10)]);

      if(result.rowCount > 0) {
        res.status(200).send(result.rows[0]); 
      } else if (result.rowCount === 0) {
        res.status(400).send([{'message': `customer id ${id} not found`}]);
      } else {
        res.status(400).send();
      }    
    } catch(e) {
      res.status(400).send({message: e.message});
    }
  });

  router.patch('/', async (req, res) => {
    try {
      const customerId = req.body.id
      const keys = Object.keys(req.body)

      let queryString, theVals, result

      if(keys.includes('firstName')) {
        queryString = `UPDATE customer SET first_name = $1 WHERE id = $2 RETURNING *`
        theVals = [req.body.firstName, parseInt(customerId, 10)]
        result = await db.query(queryString, theVals);
  
        res.status(200).send(result.rows[0])
      } else if (keys.includes('lastName')) {
        queryString = `UPDATE customer SET last_name = $1 WHERE id = $2 RETURNING *`
        theVals = [req.body.lastName, parseInt(customerId, 10)]
        result = await db.query(queryString, theVals);
  
        res.status(200).send(result.rows[0])
      } else if (keys.includes('dateOfBirth')) {
        queryString = `UPDATE customer SET date_of_birth = $1 WHERE id = $2 RETURNING *`
        theVals = [req.body.dateOfBirth, parseInt(customerId, 10)]
        result = await db.query(queryString, theVals);

        res.status(200).send(result.rows[0])
      } else {
        throw new Error(`Can't determine which field to update. Received ${Object.entries(req.body)} for customerId ${customerId}`)
      }
    } catch (e) {
      res.status(400).send({message: `Error in customerRoutes.patch:  ${e.message}`})
    }
  })
}
