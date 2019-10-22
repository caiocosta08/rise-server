const Operation = require('../models/operation.model');
const User = require('../models/user.model');
const Yield = require('../models/yield.model');
const async = require('async');

const getDate = (type) => {
    let date = new Date();
    let hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
    let minutes = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
    let seconds = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds();
    let day = date.getDay() >= 10 ? date.getDay() : '0' + date.getDay();
    let month = date.getMonth() >= 10 ? date.getMonth() : '0' + date.getMonth();
    let year = date.getFullYear();

    let moment = day + '-' + month + '-' + year + ' ' + hour + ':' + minutes + ':' + seconds;
    if(type == 'dmy') return moment.split(' ')[0];
    if(type == 'hour') return moment.split(' ')[1];
    if(type == 'date') return moment;
}

const reloadYields = () => {

    async.waterfall([
        (callback) => {
            User.find(callback);
        },
        (users, callback) => {
            console.log('\n\nusers\n\n')
            console.log(users)
            Operation.find({
                "userID": { "$in": users.map((user) => user._id) },
            }, callback);
        },
        (operations, callback) => {
            console.log('\n\noperations\n\n')
            console.log(operations)
            Yield.find({
                "userID": {
                    "$in": operations.map((operation) => operation.userID)
                },
                "date": {
                    "$in": operations.map((operation) => operation.date)
                }
            }, callback);
        }
    ], (err, res) => {
        if (err) {
            console.log('error');
            console.log(err);
        }
        else {
            console.log('\n\nresponse\n\n');
            console.log(res);
        }
    })

};

module.exports = {
    getDate,
    reloadYields
}