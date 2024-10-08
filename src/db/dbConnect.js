const mongoose = require('mongoose');

const dbURL = "mongodb+srv://josephecktech:Joseph66715@cluster0.dmwwxfp.mongodb.net/"

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