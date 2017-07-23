const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email :  {type : String},
    username : {type : String},
    lastname : {type : String}
});

userSchema.pre("save" , (next) => {
    next();
});

userSchema.methods.find = ((err,result) => {
    if(err) return console.log(err);
    return result;
});

module.exports = mongoose.model("users" , userSchema);