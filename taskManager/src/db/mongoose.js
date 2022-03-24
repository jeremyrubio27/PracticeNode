const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')

// const User = mongoose.model('User' , {
//     name: {
//         type: String
//     },
//     age: {
//         type: Number
//     },
//     password: {
//         type: String,
//         trim:true,
//         required: true,
//         validate(password){
//             if(!validator.isStrongPassword(password)){
//                 throw new Error('Password is weak')
//             }
//             if(password.toLowerCase().includes('password')){
//                 throw new Error('Password cannot contain "password" ')
//             }
//         }
//     }
// })

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