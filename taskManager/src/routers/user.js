const express = require('express');
const { Mongoose } = require('mongoose');
const auth = require('../middleware/auth')
const router = new express.Router()
const User = require('../models/user')



router.post('/users/login' , async (req ,res) => {

    try {

        const user = await User.findByCredentials(req.body.email , req.body.password)
        const token = await user.generateToken()

        res.send({user , token});

    }catch(e) {
        res.status(400).send('Input valid credentials')
    }

})

router.post('/users/logout' , auth , async (req , res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()

        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.post('/users/logoutAll' , auth , async (req , res) => {

    try{
        
    req.user.tokens = []
    await req.user.save()
    res.send()

    }catch(e){
        res.status(500).send()
    }

})

router.post('/users' , async (req , res) => {
    const user = new User(req.body)

    //Using Async to post in Postman 

    try{

        await user.save()
        const token = await user.generateToken()
        res.status(201).send({user , token})

       
        // res.status(201).send(user)

    }catch(e){

        res.status(400).send(e)

    }

    //Using process but not using Async

    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })

})

router.get('/users/me' , auth , async (req , res) => {

    res.send(req.user)
    //Got removed so that it won't expose every profile in the database
    // try{

    //     const users = await User.find({})
    //     res.status(201).send(users)

    // }catch(e) {

    //     res.status(500).send(e)

    // }

    //Using old Promise for getting the information in the DB

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})


router.get('/users/:id' , async (req , res) => {

    const _id = req.params.id;

    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.status(201).send(user)

    }catch(e) {
        res.status(500).send(e)
    }

    //Old code for fetching data from postman using Promise

    // User.findById(_id).then((user)=>{
    //     if(!user){
    //         return res.status(404).send()
    //     }

    //     res.send(user)

    // }).catch((e) => {
    //     res.status(500).send()
    // })


})

router.patch('/users/me' , auth , async(req,res) => {
    const update = Object.keys(req.body)
    const allowed = ['name' , 'email' , 'age' , 'password'];

    const isValidOperation = update.every((update) => allowed.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates! '})
    }
    
    try {

        update.forEach((updates) => req.user[updates] = req.body[updates])

        await req.user.save()

        //works fine but doesn't get affected by bycrptjs when running file 
        //const user = await User.findByIdAndUpdate(req.params.id , req.body , {new: true , runValidators:true})


        res.status(201).send(req.user)
            
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth , async (req, res) => {
    try{

        //Works fine but has it's to complex for a program
        // const user = await User.findByIdAndDelete(req.user._id)

        // if(!user){
        //     return res.status(404).send()
        // }

        await req.user.remove()

        res.status(200).send(req.user)

    }catch(e){
        res.status(500).send(e)
    }
})



module.exports = router