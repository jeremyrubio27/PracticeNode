const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowerCase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Error')
            }
        }
    },
    password: {
        type: String,
        trim:true,
        required: true,
        mainlength: 7,
        validate(password){
            if(!validator.isStrongPassword(password)){
                throw new Error('Password is weak' , Error)
            }
            if(password.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password" ')
            }   
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Error')
            }
        }
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
    
})

userSchema.methods.generateToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()} , 'thisismynewcourse') 

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

userSchema.methods.toJSON = function () {
    const user = this

    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens

    return userObject
}


userSchema.statics.findByCredentials = async (email , password) => {
    const user = await User.findOne({email}) 
        
        if(!user){
             throw new Error ('Unable to login')
        }

        const isMatch = await bcrypt.compare(password , user.password)

        if(!isMatch){
            throw new Error ('Unable to login')
        }

        return user

}

// Hash the plain text message before saving 
userSchema.pre('save' ,async function (next) {
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password , 8)
    }

    next()

})  

const User = mongoose.model('User' , userSchema)


module.exports = User;



// const newUser = new User({
//     name:"James Bond",
//     age: 23,
//     password: 'Justforlaugh@27'
// })

// newUser.save().then(() => {
//     console.log(newUser);
// }).catch((error) => {
//     console.log(error);
// })

// const usersData = mongoose.model('Tasks' , {
//     description: {
//         type: String,
//         trim: true,
//         required: true
//     },
//     completed: {
//         type: Boolean,
//         default:false,
//     }
// })

// const newUserData = new usersData({
//     description: 23,
//     completed: true
// }
// )

// newUserData.save().then(() => {
//     console.log(newUserData);
// }).catch((err) => {
//     console.log(err);
// });
