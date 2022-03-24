
// const mongodb = require('mongodb');

// const {MongoClient , ObjectID, ObjectId} = require ('mongodb');

// const id = new ObjectID()

// console.log(id);


// const connectionURL = 'mongodb://127.0.0.1:27017';
// const databeseName = 'taskManager';

// MongoClient.connect(connectionURL , {useNewUrlParser: true } , (error , client) => {
//     if(error){
//         return console.log('Unable to connect to databased');
//     }

//     const db = client.db(databeseName);
// });


//Insert inside the MongoClient


// db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Emy',
    //     age: 26
    // }, (error , result) => {
    //     if(error){
    //         return console.log('unable to insert');
    //     }
        
    //     console.log(result.insertedId);    
    
    // })

    // db.collection('users').insertMany([
    //     {
    //         name:'jen',
    //         age:28
    //     },{
    //         name:'jeremy',
    //         age:27
    //     }
    // ], (error, result) => {
    //     if(error){
    //        return console.log('unable to insert documents');
    //     }

    //     console.log(result.insertedIds);
    // })  

    // db.collection('task').insertMany([
    //     {
    //         description: '',
    //         completed: true
    //     },
    //     {
    //         description: '',
    //         completed: true
    //     },
    //     {
    //         description: '',
    //         completed:false
    //     }
    // ], (error , result) => {
    //     if(error){
    //         return console.log('unable to connect');
    //     }

    //     console.log(result.insertedIds);
    // })

    // db.collection('notes').insertMany([
    //     {
    //         description: 'To buy groceries',
    //         completed: true
    //     },
    //     {
    //         description: 'To clean the bathroom',
    //         completed: false
    //     },
    //     {
    //         description: 'To fix the bug in my program',
    //         completed: false
    //     }
    // ] , (error, result) => {
    //     if(error){
    //         return console.log('unable to insert');
    //     }

    //     console.log(result.insertedIds);
    // })
    

    //Find

     
    // db.collection('users').findOne({_id: ObjectId("61c3d4dbf311af39e1af8d7c")} , (error , users) =>{
    //     if(error){
    //         return console.log('Unable to find user');
    //     }

    //     console.log(users);
    // })

    // db.collection('task').findOne({_id: ObjectId('61c3e54724b869bb5b64eba3')} , (error , response) => {
    //     if(error){
    //         return console.log('Unable to find the task');
    //     }

    //     console.log(response);
    // })

    // console.log('\n');
    // db.collection('task').find({completed: true}).toArray((error , response) => {
    //     if(error){
    //         return console.log('Unable to find the incomplete task');
    //     }
    //     console.log(response);
    // })
4
    //UPDATE

    // const updateDB = db.collection('users').updateOne(
    //     {
    //     _id:ObjectId('61c3d4dbf311af39e1af8d7c')
    //  },{
    //      $set:{
    //          name: 'Rubio'
    //      }
    //  }
    //  )
 
    //  updateDB.then((resolve) => {
    //      console.log(resolve);
    //  }).catch((error)=>{
    //      console.log(error);
    //  })
    
    
    // db.collection('task').updateMany({completed: false},{
    //     $set:{
    //         completed:true
    //     }
    // }).then((resolve) =>{
    //     console.log(resolve);
    // }).catch((reject)=>{
    //     console.log(reject);
    // })

    
    // db.collection('users').deleteOne({name: 'jeremy'}).then((resolve) => {
    //     console.log(resolve);
    // }).catch((error) => {
    //     console.log(error);
    // })
   