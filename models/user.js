const mongoose = require('mongoose');
//connect with database
mongoose.connect('mongodb://localhost:27017/CRUD');
const Schema = mongoose.Schema;

// Define a schema for the documents in the 'products' collection
const userSchema = new Schema({
image:String,
name: String,
email: String
});
//export the model
module.exports = mongoose.model('user', userSchema);