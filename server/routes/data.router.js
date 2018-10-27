const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route for Plant Data (History) View -- 
// gets all plant data and displays it on the page, ordered by intake date
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const query = `SELECT * FROM "light_data" ORDER BY "date" DESC;`;
        pool.query(query).then((results)=> {
            res.send(results.rows);
        }).catch((error) => {
            console.log('GET light_data error: ', error);
            res.sendStatus(500);
        });//end error handling
    } else {
        res.sendStatus(403);
    };//end if else
}); // end plant data GET route

module.exports = router;