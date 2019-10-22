const mongoose = require("../database");
const bcrypt = require("bcryptjs");
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
    if (type == 'dmy') return moment.split(' ')[0];
    if (type == 'hour') return moment.split(' ')[1];
    if (type == 'date') return moment;
}

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        uppercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    rate: {
        type: Number
    },
    accountType: {
        type: String,
        //required: true,
        uppercase: true,
        default: "USER"
    },
    balance: {
        type: Number,
        default: 0,
        //required: true,
    },
    personType: {
        type: String,
        default: 'PERSON',
        uppercase: true,
        //required: true,
    },
    sex: {
        type: String,
        default: 'MALE',
        uppercase: true,
        //required: true,
    },
    document: {
        type: String,
        //required: true,
    },
    phone: {
        type: String,
        //required: true,
    },
    birthDate: {
        type: Date,
        //required: true,
    },
    bank: {
        type: String,
        //required: true,
    },
    bankAgency: {
        type: String,
        //required: true,
    },
    bankAccount: {
        type: String,
        //required: true,
    },
    bankAccountType: {
        type: String,
        //required: true,
        //defaut: 'CURRENT'
    },
    rg: {
        type: String,
        //required: true
    },
    cep: {
        type: String,
        //required: true,
    },
    street: {
        type: String,
        //required: true,
    },
    neighborhood: {
        type: String,
        //required: true,
    },
    city: {
        type: String,
        //required: true,
    },
    state: {
        type: String,
        //required: true,
    },
    adressNumber: {
        type: String,
        //required: true,
    },
    createdAt: {
        type: String,
        default: getDate()
    },
    updatedAt: {
        type: String,
        default: getDate()
    },
});

UserSchema.pre("save", async function(next){
    this.updatedAt = getDate('date');
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
