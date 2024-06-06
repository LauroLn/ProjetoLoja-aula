import user from "../models/User.js"
import mongoose from 'mongoose'

const User = mongoose.model("User", user)  // User é o nome que vai ser criado no bd, user é o nome que a gente importa la em cima, sendo puxado do model

class UserService{
       Create(email, password){
        const newUser = new User({
            email : email,
            password : password
        })
        newUser.save()
       }

       SelectOne(email){
           const user = User.findOne({email : email})
           return user
       }
}

export default new UserService()


