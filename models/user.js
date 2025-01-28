const mongoose = require('mongoose');
//connect with database
if (mongoose.connect('mongodb://localhost:27017/CRUD')) {
    console.log('Database connected');
} else {
    console.log('Database not connected');
}

const Schema = mongoose.Schema;

// Define a schema for the documents in the 'products' collection
const userSchema = new Schema({
    name: String,
    email: String,
    image:String
});
//export the model
module.exports = mongoose.model('user', userSchema);
