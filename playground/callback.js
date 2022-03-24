//  CALLBACK

require('../taskManager/src/db/mongoose')
const User = require("../taskManager/src/models/user");
const Task = require('../taskManager/src/models/tasks');


// const thisIsAFunction = (callback) => {
//     setTimeout(() => {
//         callback(undefined , 2+4);
//     }, 2000)
// }

// thisIsAFunction((error , response)=> {
//     if(error){
//         return console.log('Error');
//     }
//     console.log(response);
// })

//PROMISE ---------------------------
// const prom = new Promise((resolve , reject) => {
//     setTimeout(()=> {
//         reject('HEHE');
//     },1000)
// })

// prom.then((response) => {
//     console.log(response);
// }).catch((error) =>{
//     console.log(error);
// })

// const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/task-manager');

// const User = mongoose.model('User' , {
//     name:{

//     },
//     age:{

//     }
// })

// const newUser = new User();

// newUser.save().then(() => {
//     console.log(newUser);
// }).catch((error) => {
//     console.log(error);
// })

//PROMISE CHAINING ------------------------


// const add = (a,b) => {
//     return new Promise ((resolve , reject) => {
//         setTimeout(() => {
//             resolve(a + b)
//         } , 2000)
//     })
// }

//Wrong way of Chaining

// add(1,2).then((sum) => {
//     console.log(sum);
//     add(sum , 2).then((sum2) => {
//         console.log(sum2);
//     }).catch((e) => {
//         console.log(e);
//     })
// }).catch((e) => {
//     console.log(e);
// })

//Right way of chaining

// add(1,2).then((sum) => {
//     console.log(sum);
//     return add(sum , 4)
// }).then((sum2) => {
//     console.log(sum2);
// }).catch((e) =>{
//     console.log(e);
// })

//Promise Chaining Example 


// require('../taskManager/src/db/mongoose')
// const User = require('../taskManager/src/models/user');

// User.findByIdAndUpdate('61c75bc9809f72fd616d9d81' , { age: 1}).then((user) => {
//     console.log(user);
//     return User.countDocuments({age:1})
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// })

//Promise Chaining in deleting a task on postman

Task.findByIdAndDelete('61c586cf7c756cf9ea914e95').then((task)=> {
    console.log(task);
    return Task.countDocuments({completed:true})
}).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
})



//61c586cf7c756cf9ea914e95