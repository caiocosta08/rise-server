const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const functions = require('./functions');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./controllers/users.controller")(app);
require("./controllers/operations.controller")(app);
require("./controllers/yields.controller")(app);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(process.env.PORT || 8000, () => {
    const message = "Server running on port 8000";
    console.log(message);
});

const reload = () => {

    setTimeout(() => {
        //console.log(functions.getDate());
        //if(moment == '19:15')
        //console.log(moment);
        reload();
    }, 1000);    
}
//reload();
//functions.reloadYields();