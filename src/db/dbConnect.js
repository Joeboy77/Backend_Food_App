const mongoose = require('mongoose');

const dbURL = process.env.MONGO_URI

const dbConnect = async () => {
    try{
        await mongoose.connect(dbURL)
        console.log("MongoDB connected...");
        
    }
    catch(err){
        console.log(err);
        process.exit(1)
        
    }
}

module.exports = dbConnect;