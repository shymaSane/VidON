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
//to run mongo shell: type mongo --shell in cmd line after cd to bin file