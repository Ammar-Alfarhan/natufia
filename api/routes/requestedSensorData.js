const express = require('express');
const router = express.Router({});

const mysql = require('../../connection');


// This route is to bring temperature data from the database
// and send it to the frontend
router.get('/temperature', (req, res, next) =>{
    try{
        const sql = "SELECT * FROM temperature ORDER BY(timestamp) DESC;";
        mysql.query(sql, (err, result) =>{
            if(err){
                res.status(404).json(err);
            }
            if(result) {
                res.status(200).json(result);
            }
        });
    }catch (err){
        res.status(500).json({
            error: err
        });
    }
});

// This route is to bring door open data from the database
// and send it to the frontend
router.get('/door-open', (req, res, next) =>{
    try{
        const sql = "SELECT * FROM door_open ORDER BY(timestamp) DESC;";
        mysql.query(sql, (err, result) =>{
            if(err) {
                res.status(404).json(err);
            } 
            if(result) {
                res.status(200).json(result);
            }
        });
    } catch (err){
        res.status(500).json({
            error: err
        });
    }
});

module.exports = router;