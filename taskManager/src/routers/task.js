const express = require('express')
const router = new express.Router()
const Tasks = require('../models/tasks') 

router.post('/tasks' , async (req , res) => {
    const task = new Tasks(req.body)

    //Using Async to post in Postman 

    try{
        await task.save()
        res.status(201).send(task)

    }catch(e){

        res.status(400).send(e)

    }

    //Old code for posting in Postman using Promise 
    // task.save().then(() => { 
    //     res.status(201).send(task);
    // }).catch((err) => {
    //     res.status(400).send(err);
    // })

})

// app.post('/tasks/:id' , (req , res) => {

//     const _id = req.params.id

//     Tasks.findById(_id).then((tasks) => {

//         if(!tasks){
//             return res.status(404).send
//         }

//         res.send(tasks)

//     }).catch((e) => {
//             return res.status(500).send()
//     })

// })



router.get('/tasks/:id' , async (req , res) => {

    // New code using Async & Await

    const _id = req.params.id

    try{

        const task = await Tasks.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.status(201).send(task)

    }catch(e) {

        res.status(500).send(e)

    }


    //Old code for getting the task in the postman using Promise

    // Tasks.findById(_id).then((task) => {
    //     if(!task){
    //         return res.status(404).send()
    //     }
    //     res.send(task)

    // }).catch((err) => {
    //     res.status(500).send()
    // })
})




router.get('/tasks' , async (req , res) => {

    try{
        const tasks = await Tasks.find({})
        res.status(201).send(tasks)

    }catch(e){
        res.status(500).send()
    }

})

router.patch('/tasks/:id' , async(req , res) => {
    const updates = Object.keys(req.body)
    const allowed = ['description' , 'completed']

    const isValidOperation = updates.every((updates) => allowed.includes(updates))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates'})
    }

    try{

        const task = await Tasks.findById(req.params.id)

        updates.forEach((updates) => task[updates] = req.body[updates])

        await task.save()

        //const task = await Tasks.findByIdAndUpdate(req.params.id , req.body , {new: true , runValidators: true})

        if(!task){
            return res.status(404).send()
        }

        res.status(201).send(task)

    }catch(e){
        res.status(500).send(e)
    }

})



router.delete('/tasks/:id' , async (req , res) => {

    try{

        const task = await Tasks.findByIdAndDelete(req.params.id)



        if(!task){
           return res.status(404).send({error: 'task not found'})
        }

        res.status(200).send(task);

    }catch(e){
        res.status(500).send(e)
    }

})

module.exports = router