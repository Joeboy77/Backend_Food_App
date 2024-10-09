const mongoose = require('mongoose');

require('dotenv').config();



const dbConnect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected...");
        
    }
    catch(err){
        console.log(err);
        process.exit(1)
        
    }
}

module.exports = dbConnect;