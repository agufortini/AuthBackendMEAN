const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        //Create connection using Mongoose
        await mongoose.connect(process.env.BD_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Database online');

    } catch (error) {
        console.log(error);
        throw new Error('Failed to initialized database');
    }
}

module.exports = {
    dbConnection
}