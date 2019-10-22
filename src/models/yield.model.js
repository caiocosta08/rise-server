const mongoose = require('../database');
const functions = require('../functions');

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


const YieldSchema = new mongoose.Schema({
    userID: { type: String, required: true, unique: false },
    date: {
        type: String, 
        default: getDate('dmy')
    },
    initialBalance: { type: Number, default: 0.00 },
    input: { type: Number, default: 0.00 },
    output: { type: Number, default: 0.00 },
    finalBalance: { type: Number, default: 0.00 },
    // dayRate: { type: Number, default: 0.00 },
    // monthRate: { type: Number, default: 0.00 },
    // totalRate: { type: Number, default: 0.00 },
     createdAt: { type: String, default: getDate('date'), },
     updatedAt: { type: String, default: getDate('date'), }

});

YieldSchema.pre("save", function (next){
    
    this.updatedAt = getDate('date');
    // this.finalBalance = this.initialBalance - (this.input - this.output);
    next();
});

const Yield = mongoose.model("Yield", YieldSchema);

module.exports = Yield;