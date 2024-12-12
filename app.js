const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieparser());

const router = require("./Route/route");

app.use(router)
module.exports = app