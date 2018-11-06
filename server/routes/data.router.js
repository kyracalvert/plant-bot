const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const cron = require('node-cron');
const axios = require('axios');

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

// Make a request for data every 10 minutes
cron.schedule('*/5 * * * *', function(){
    console.log('running a task every 5 minutes');
    getLight();
});

getLight();  

function getLight(){
    axios.get(`https://api.spark.io/v1/devices/${process.env.DEVICE_ID}/front?access_token=${process.env.TOKEN}`).then(function (response) {
      // TODO: Save results in the database
      console.log(response.data);
    }).catch(function (error) {
      console.log(error);
    });
} 
module.exports = router;