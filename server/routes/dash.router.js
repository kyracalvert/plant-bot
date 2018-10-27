const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const query = `SELECT * FROM "light_data" ORDER BY "date" DESC LIMIT 1;`;
        pool.query(query).then((response)=> {
            res.send(response.rows);
        }).catch((error) => {
            console.log('GET light_data error: ', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    };//end if else
});

router.get('/plantFacts', (req, res) => {
    if (req.isAuthenticated()) {
        const query = `SELECT * FROM "plant" WHERE "owner_id" = ${req.user.id};`;
        pool.query(query).then((response)=> {
            console.log(response.data);
            res.send(response.rows);
        }).catch((error) => {
            console.log('GET light_data error: ', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    };//end if else
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;