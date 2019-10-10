const express = require('express');
const Operation = require('../models/operation.model');

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const operations = await Operation.find();
        if(operations.length > 0){
            return res.send(operations);
        }else{
            return res.status(400).send({error: 'no operations found'});
        }
    } catch (error) {
        return res.status(400).send({error: error});
    }
});

router.post("/register", async (req, res) => {
    try {
        /*
        const operationTypes = ['withdrawal', 'offset'];
        const value = (Math.random() * (5000 - 50) + 50).toFixed(2);
        const userID = [
            '5d93a8f01c0cae29b0cf3e58',
            '5d93a8f01c0cae29b0cf3e59',
            '5d93aa9283e83d0530bfaa70'
        ];
        const status = ['Pending', 'Authorized', 'Completed'];
        const statusBy = userID[1];
        const operation = {
            operationType: operationTypes[1],
            value: value,
            userID: userID[0],
            status: status[2],
            statusBy: statusBy,
        };
        */

        const operation = await req.body;
        operation = await Operation.create(operation);
        if(operation){
            return res.send(operation);
        }else{
            return res.status(400).send({error: 'operations register failed'});
        }
    } catch (error) {
        return res.status(400).send({error: error});
    }
});

module.exports = app => app.use("/operations", router);