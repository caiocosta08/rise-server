const express = require('express');
const Yield = require('../models/yield.model');

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const yields = await Yield.find();
        if (yields.length > 0) {
            return res.send(yields);
        } else {
            return res.status(400).send({ error: 'no yields found' });
        }
    } catch (error) {
        return res.status(400).send({ error: error });
    }
});
router.post("/delete", async (req, res) => {
    try {
        const yield = req.body;
        const yields = await Yield.deleteOne({ userID: yield.userID });
        if (yields.n == 1) {
            return res.send({ message: 'yield deleted' });
        } else {
            return res.status(400).send({ error: 'no yields deleted' });
        }
    } catch (error) {
        return res.status(400).send({ error: error });
    }
});

router.post("/register", async (req, res) => {
    try {
        const yield = await req.body;
        yield = await Yield.create(yield);
        if (yield) {
            return res.send(yield);
        } else {
            return res.status(400).send({ error: 'yields register failed' });
        }
    } catch (error) {
        return res.status(400).send({ error: error });
    }
});
router.post("/update", async (req, res) => {
    try {
        const yield = await req.body;
        const conditions = { test: 'Caio', day: yield.day, month: yield.month, year: yield.year };
        let input = await yield.input;
        let output = await yield.output;
        let operation = await Yield.find(conditions);
        let initialBalance = await operation[0].initialBalance;
        console.log(operation[0]);
        let dayRate = await operation[0].monthRate / 30; //30 deve ser mudado para a quantidade de dias do mês
        input = 0; //await operation[0].input * 10;
        output = 0; //await operation[0].output * 10;
        let finalBalance = initialBalance * 10;
        /*
        input = input + (await operation[0].input);
        output = output + (await operation[0].output);
        let finalBalance = (initialBalance + input - output);
        */
        
        operation = await Yield.findOneAndUpdate(conditions,
            { finalBalance: finalBalance, input: input, output: output }, (error, response) => {
                //if (error) console.log(error);
                //else console.log(response);
            });
        return res.send(operation);

    } catch (error) {
        return res.status(400).send({ error: error });
    }
});

module.exports = app => app.use("/yields", router);