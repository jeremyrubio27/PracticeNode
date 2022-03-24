const User = require("../taskManager/src/models/user")
require('../taskManager/src/db/mongoose')
const Task = require('../taskManager/src/models/tasks')

// const add = (a,b) => {
//     return new Promise ((resolve , reject) => {
//         setTimeout(() => {
//             resolve(a + b)
//         } , 2000)
//     })
// }


// const doWork = async () => {

//     const sum =  await add(1,22)
//     const sum2 = await add(sum , 200);

//     return sum2
// }

// doWork().then((result) => {
//     console.log('result:' , result);
// }).catch((e) => {
//     console.log(e);
// })

//Async Using the User DB

// const updateAge = async (id ,age) => {
//     const user = await User.findByIdAndUpdate(id , {age})
//     const count = await User.countDocuments({age});

//     return count
// }

// updateAge('61c5740eda58d3b089994f05' , 3).then((count) => {
//     console.log(count);
// }).catch((e) => {
//     console.log(e);
// })


//Async Using the Task DB

// const updateTask = async (id , completed) => {
//     const task = await Task.findByIdAndDelete(id)
//     const count = await Task.countDocuments({completed: true })

//     return count;
// }

// updateTask('61c7fa53a8a4393ee5f401fc').then((count) => {
//     console.log(count);
// }).catch((e) => {
//     console.log(e);
// })