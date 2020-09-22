const express = require('express')
const expressLayouts = require("express-ejs-layouts");

const app = express()

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static('views'));

app.use('/', require('./routes/index'));

app.listen(3000, (error)=>{
    console.log("Server running...");
})
