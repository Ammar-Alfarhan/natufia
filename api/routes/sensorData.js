const express = require('express');
const router = express.Router({});

const mysql = require('../../connection');

// This route is to register sensors into my database
// This function only take the id of the sensor from
// the body of a json object
router.post('/register-sensor', async (req, res, next) =>{
    const sensorId = parseInt(req.body.ID);
    try{
        // first I check if the sensor id is saved in my database
        const sql = "SELECT * FROM sensor_ids WHERE sensorId = "+ sensorId +";";
        mysql.query(sql, (err, result)=>{
            if (err) console.log(err);
            // Then if the id is not in my database I save it here
            if(result.length < 1){
                const sql = "INSERT INTO sensor_ids (sensorId) VALUES ("+ sensorId +");";
                mysql.query(sql, (err, result) =>{
                    if(result){
                        res.status(201).json({
                            message: "New sensor was registered"
                        });
                    }
                    if(err) console.log(err);
                });
            } else {
                res.status(409).json({
                    message: "Sensor already exists"
                });
            }
        });
    }catch (err) {
        res.status(500).json({
            error: err
        });
    }
});

// This route is to store temperature record into the database
// these records are coming from the sensor
router.post('/temperature', async (req, res, next) =>{
    const sensorId = parseInt(req.body.ID);
    const temperature = parseFloat(req.body.value);
    const alert = req.body.alert;
    const timestamp = req.body.timestamp;

    try{
        const sql = "INSERT INTO temperature (sensorId, temperature, alert, timestamp) VALUES ("+ sensorId +", "+ temperature +", '"+ alert +"', "+ timestamp +");";
        mysql.query(sql, (err, result) =>{
            if(err) console.log(err);
            if(result){
                res.status(201).json({
                    message: "New temperature record was added"
                });
            } else {
                res.status(400).json({
                    message: err
                });
            }
        });
    }catch (err){
        res.status(500).json({
            error: err
        });
    }
});

// This route is to store door open record into the database
// these records are coming from the sensor
router.post('/door-open', async (req, res, next) =>{
    const sensorId = parseInt(req.body.ID);
    const isDoorOpen = req.body.value;
    const timestamp = req.body.timestamp;

    try{
        const sql = "INSERT INTO door_open (sensorId, doorOpen, timestamp) VALUES ("+ sensorId +", '"+ isDoorOpen +"', "+ timestamp +");";
        mysql.query(sql, (err, result) =>{
            if (err) console.log(err);
            if(result){
                res.status(201).json({
                    message: "New doorOpen record was added"
                });
            } else {
                res.status(400).json({
                    message: err
                });
            }
        });
    }catch (err){
        res.status(500).json({
            error: err
        });
    }
});

module.exports = router;