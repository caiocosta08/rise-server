const express = require('express');
const Operation = require('../models/operation.model');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

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

router.post('/update', async (req, res) => {
    try {
        let operation = await req.body;
        operation = await Operation.find({_id: operation._id /*, userID: operation.userID*/ }, async (error, o) => {
            o[0].status = operation.status;
            o[0].save();
        }, {new: true})
        if(operation) return res.send(operation);
        else return res.status(400).send({error: 'Update error'});
    } catch (error) {
        return res.status(400).send({error: error})
    }
});

router.post("/register", async (req, res) => {
    try {

        let operation = await req.body;
        operation = await Operation.create(operation);
        if(operation){
            return res.send(operation);
        }else{
            return res.status(400).send({error: 'operations register failed'});
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({error: error});
    }
});

module.exports = app => app.use("/operations", router);