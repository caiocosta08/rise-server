const express = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

const router = express.Router();

const generateToken = (params = {}) => {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    });
};

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        users.map(user => {
            user.password = undefined;
        });
        return res.send(users);
    } catch (error) {
        return res.status(400).send({ error: error });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = await req.body;
        const user = await User.findOne({ email }).select('+password');
        
        if(!user) 
            return res.status(400).send({error: 'User not found'});

        if(!await bcrypt.compare(password, user.password))
            return res.status(400).send({error: 'Invalid password'});

        user.password = undefined;

        let token = generateToken({id: user._id});

        return res.send({
            user, 
            token: generateToken({id: user._id}),
        });

    } catch (error) {
        return res.status(400).send({ error: 'error' });
    }
});

router.post("/register", async (req, res) => {
    const { email } = req.body;
    try {
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: "user already exists" });
        }

        let user = req.body;
        user = await User.create(user);
        user.password = undefined;

        if (user) {
            return res.send({
                user, 
                token: generateToken({user: user._id}),
            });
        } else {
            return res.status(400).send({ error: "registration failed" });
        }
    } catch (error) {
        return res.status(400).send({ error: error });
    }
});

router.post("/delete", async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.body._id });
        if (user) {
            return res.send({ status: 'deleted' });
        } else {
            return res.status(400).send({ status: 'not deleted' });
        }
    } catch (error) {
        return res.status(400).send({ error: error })
    }
});

module.exports = app => app.use("/users", router);
