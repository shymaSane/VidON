const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

//make new scheam 
const IdeasSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    detailes: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

mongoose.model('Ideas', IdeasSchema);

///NOTE:
//first  run mongod.exe
//open new cmd window run (net start mongodb)
//then run (monog)