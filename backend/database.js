const mongoose = require("mongoose")

const connectDB = async () => {
    const conn = await mongoose.connect("mongodb+srv://CuuNonNongTanh:cuunonnongtanh@littlebit.3brle.mongodb.net/SmartPrinting?retryWrites=true&w=majority&appName=LittleBit")
    .then(()=>{
        console.log("Success...")
    })
    .catch((e)=>{
        console.error("Connection Error", e)
        process.exit(1)
    })

};

module.exports=connectDB;