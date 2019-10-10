const mongoose = require('../database');

const OperationSchema = new mongoose.Schema({
    operationType: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true,
    },
    userID: { //user operator
        type: String,
        required: true,
    },
    statusBy: { //admin operator. ex: authorize operation
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "Pending",
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