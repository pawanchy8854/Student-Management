const mongoose = require("mongoose");

const DB = "mongodb+srv://<username>:<password>@cluster0.5mipo.mongodb.net/miniproject?retryWrites=true&w=majority"

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log("connection start")).catch((error)=> console.log(error.message));