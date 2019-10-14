const mongoose = require('../database');

const DaySchema = new mongoose.Schema({
    initialBalance: { type: String, default: "0.00"},
    input: { type: String, default: "0.00"},
    output: { type: String, default: "0.00"},
    dayInterestRate: { type: String, default: "0.0000"},
    monthInterestRate: { type: String, default: "0.0000"},
    totalInterestRate: { type: String, default: "0.0000"},
    finalBalance: { type: String, default: "0.00"},
});

const MonthSchema = new mongoose.Schema({
    days: { type: String },
    : { type: String },
});

const YieldSchema = new mongoose.Schema({
    userID: { //user operator
        type: String,
        required: true,
    },
    year: {

    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
    
});

const Operation = mongoose.model("Operation", OperationSchema);

module.exports = Operation;