var express = require('express');
var router = express.Router();

var db = require('../db');

module.exports = (app: any) => {
  app.use('/api/v1/provider', router);

  router.get('/', async function(req: any, res: any) {
    const queryString = "SELECT * FROM provider";
    
    try {
      const result = await db.query(queryString);

      if(result) {
        res.status(200).json(result.rows);
      } else {
        res.status(400).send();
      }   
    } catch(e: any) {
      res.status(400).send({message: e.message});
    }
  });

  router.get('/:id', async function(req: any, res: any) {
    const { id } = req.params;
    const queryString = "SELECT * FROM provider WHERE id = $1";

    try {
      const result = await db.query(queryString, [parseInt(id, 10)]);

      if(result.rowCount > 0) {
        res.status(200).send(result.rows[0]); 
      } else if (result.rowCount === 0) {
        res.status(400).send([{'message': `provider id ${id} not found`}]);
      } else {
        res.status(400).send();
      }    
    } catch(e: any) {
      res.status(400).send({message: e.message});
    }
  });
}
