const connection = require('../connection');




let modelOps={};

modelOps.storeInputandOutput=async(input,output)=>{

    try {

        let model= await connection.getTransactionCollection();
        let isInserted = await model.create({
            input,
            output
        })

        return isInserted;

    } catch (error) {
        throw error
    }

}

modelOps.getAllInputOutput=async()=>{

    try {

        let model= await connection.getTransactionCollection();
        let isInserted = await model.find({});

        return isInserted;

    } catch (error) {
        throw error
    }

}

module.exports=modelOps;