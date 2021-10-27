const mongoose = require("mongoose");
const DB = process.env.DB_HOST;

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Connected To MongoDB..");
}).catch((error) =>{
    console.log('failed to connect!!!');
});