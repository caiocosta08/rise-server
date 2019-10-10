const mongoose = require("../database");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    accountType: {
        type: String,
        required: true,
        default: "user"
    },
    balance: {
        type: String,
        default: 0,
        required: true,
    },
    personType: {
        type: String,
        default: 'Person',
        required: true,
    },
    sex: {
        type: String,
        default: 'Male',
        required: true,
    },
    document: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    bank: {
        type: String,
        required: true,
    },
    bankAgency: {
        type: String,
        required: true,
    },
    bankAccount: {
        type: String,
        required: true,
    },
    bankAccountType: {
        type: String,
        required: true,
        defaut: 'Current'
    },
    rg: {
        type: String,
        required: true
    },
    cep: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    neighborhood: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    adressNumber: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

UserSchema.pre("save", async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
