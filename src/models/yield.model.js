const mongoose = require('../database');

const YieldSchema = new mongoose.Schema({
    userID: { type: String, required: true, unique: true, },
    test: { type: String, default: "Caio", },
    day: { type: String },
    month: { type: String },
    year: { type: String },
    initialBalance: { type: Number, default: 0.00 },
    input: { type: Number, default: 0.00 },
    output: { type: Number, default: 0.00 },
    dayRate: { type: Number, default: 0.00 },
    monthRate: { type: Number, default: 0.00 },
    totalRate: { type: Number, default: 0.00 },
    finalBalance: { type: Number, default: 0.00 },
    createdAt: { type: Date, default: Date.now, },
    updatedAt: { type: Date, default: Date.now, }

});

const Yield = mongoose.model("Yield", YieldSchema);

module.exports = Yield;