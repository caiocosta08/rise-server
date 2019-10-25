const mongoose = require('../database');
const functions = require('../functions');
const Yield = require('./yield.model');
const User = require('./user.model');

const getDate = (type) => {
    let date = new Date();
    let hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
    let minutes = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
    let seconds = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds();
    let day = date.getDay() >= 10 ? date.getDay() : '0' + date.getDay();
    let month = date.getMonth() >= 10 ? date.getMonth() : '0' + date.getMonth();
    let year = date.getFullYear();

    let moment = day + '-' + month + '-' + year + ' ' + hour + ':' + minutes + ':' + seconds;
    if (type == 'dmy') return moment.split(' ')[0];
    if (type == 'hour') return moment.split(' ')[1];
    if (type == 'date') return moment;
}


const OperationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        uppercase: true,
    },
    value: {
        type: Number,
        required: true,
    },
    userID: { //user operator
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: getDate('dmy')
    },
    statusBy: { //admin operator. ex: authorize operation
        type: String,
        required: false,
        uppercase: true,
    },
    status: {
        type: String,
        default: "PENDING",
        uppercase: true,
    },
    createdAt: {
        type: String,
        // default: Date.now,
        default: getDate('date'),
    },
    updatedAt: {
        type: String,
        // default: Date.now,
        default: getDate('date'),
    }

});

OperationSchema.pre("save", /*async*/ function (next) {


    console.log(this)
    if(this.status === 'AUTHORIZED'){
        User.findOneAndUpdate({_id: this.userID}, function(err, doc){
            console.log(doc)
        })
    }

    // console.log(this)
    //update or create yield
    // if (this.status == 'AUTHORIZED') {
    //     let y = await Yield.find({ date: this.date, userID: this.userID }, async (error, y) => {
    //         if (y.length > 0) {
    //             y[0].input = this.type == 'INPUT' ? (y[0].input + this.value) : y[0].input,
    //                 y[0].output = this.type == 'OUTPUT' ? (y[0].output + this.value) : y[0].output,
    //                 y[0].finalBalance = y[0].initialBalance + (y[0].input - y[0].output);
    //             y[0].save((err, data) => {
    //                 if (err) throw err;
    //                 // console.log(data)
    //             });
    //         }
    //     });

    //     if (y.length == 0) {
    //         y = await Yield.create({
    //             initialBalance: this.type == 'INPUT' ? this.value : 0,
    //             userID: this.userID,
    //             date: this.date,
    //             input: this.type == 'INPUT' ? this.value : 0,
    //             output: this.type == 'OUTPUT' ? this.value : 0,
    //             finalBalance: this.value,
    //         });
    //     }
    // }
    this.updatedAt = getDate('date');
    next();
});

const Operation = mongoose.model("Operation", OperationSchema);

module.exports = Operation;