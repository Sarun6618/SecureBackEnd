const mongoose = require('mongoose');
const DATABASE_URI = 'mongodb://127.0.0.1:27017/AssetsData';
const connectDB = async () => {
    try {
        await mongoose.connect(DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB