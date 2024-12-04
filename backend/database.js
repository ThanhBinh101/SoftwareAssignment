const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            'mongodb+srv://CuuNonNongTanh:cuunonnongtanh@littlebit.3brle.mongodb.net/?retryWrites=true&w=majority&appName=LittleBit', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected successfully');
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;