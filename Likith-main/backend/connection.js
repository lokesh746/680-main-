const { Schema } = require('mongoose');
const mongoose = require('mongoose');


const url = "mongodb+srv://likhith27addela:nzvQczvpcS5OFrio@cluster0.2a7ytb2.mongodb.net/?retryWrites=true&w=majority";


let connection={};
const ResultsLog = Schema(
    {
        input:{type:Object,required:true},
        output:{type:Array,required:true}
    },{collection:"ResultsLog"}
)

connection.getTransactionCollection = async()=>{
    try{
        let dbConnection = await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }); //db connect
        let model = await dbConnection.model('ResultsLog', ResultsLog);
        return model;
    }
    catch(e){
        let err = new Error("Couldn't connect to database");
        err.status=500;
        throw err;

    }
}

module.exports = connection;