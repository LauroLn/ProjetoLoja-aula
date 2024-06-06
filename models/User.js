import  mongoose  from "mongoose";

const user = mongoose.Schema({
    email: String,
    password: String
})

export default user