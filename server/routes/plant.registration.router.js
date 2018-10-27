const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('in plant registration POST');
        console.log(req.body);
        const plant = req.body;
        const queryText = `INSERT INTO "plant" ("owner_id", "plant_name", "plant_photo", "light_exposure", "care_instructions", "plant_type") VALUES ($1, $2, $3, $4, $5, $6) ;`;
        pool.query(queryText, [req.user.id, plant.plantName, plant.photo, plant.lightHours, plant.careNotes, plant.plantType ])
        .then((result)=>{
        res.sendStatus(201);
        })
        .catch((error)=>{
        console.log('error making plant POST', error);
        res.sendStatus(500);
        })
    }
    else {
        res.sendStatus(403) //unauthorized message
    }

});

module.exports = router;