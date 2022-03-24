const express = require('express');
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const fs = require('fs')
const WordsNinjaPack = require('wordsninja')
const app = express();
const wordsninja = new WordsNinjaPack()

const port = process.env.PORT || 3000

//Blocking Get method using Middleware
// app.use((req,res,next) => {
//    if(req.method === 'GET'){
//         res.send('Get request are disabled')
//    }else{
//        next()
//    }
// })


//Blocking post using Middleware
// app.use((req,res,next) => {
//     if(req.method === "GET" || req.method === "POST" || req.method === "DELETE" || req.method === "PATCH"){
//         res.status(503).send("Site is under maintenance. Plase come back soon !")
//     }else{
//         next()
//     }
// })


const multer = require('multer')

const upload = multer ({
    fileFilter(req , file,cb){
        if(!file.originalname.match(/\.(txt|csv)$/)){
            return cb(new Error('Please upload a txt or csv'))
        }
        cb(undefined , true)
    }
})


app.post('/upload' , upload.single('upload') , async (req , res) => {

    await wordsninja.loadDictionary()

    let toReadFile = req.file.buffer
    let message = toReadFile.toString()
    let messageInCsv = message.replace(/,/g, '')

    if(message.includes(',') && message.search("0") == 0){
        let billingMessage = messageInCsv.slice(0,2)
        let startdate = messageInCsv.slice(2,10)
        let enddate = messageInCsv.slice(12,22  )

        res.status(200).send({
            billingCycle: billingMessage,
            startingDate: startdate,
            endDate: enddate
        })
    }
    else if(isNaN(message) === true ){
        let toSplit  = wordsninja.splitSentence(message , 
            {
                camelCaseSplitter:true , 
                capitalizeFirstLetter:false , 
                joinWords:true
            })
        res.send({message: toSplit})
    }
    else{
        res.send({message: message})
    }

}, (error , req ,res,next) => {
    res.status(400).send({error: error.message})
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// toJSON makes stringify not visible
// const pet = {
//     name: 'Hal'
// }

// pet.toJSON = function () {
//    return {}
// }
// console.log(JSON.stringify(pet));

//Using Router in localhost 3000
// const router  = new express.Router()

// router.get('/test' , (req , res) => {
//     res.send('This is my router')
// })

// app.use(router)


app.listen(port , () => {
    console.log('Server is running ' + port);
})

//Sample for the JsonWebToken to access specific Users
// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({_id: 'abc123'} , 'thisismynewcourse' , {expiresIn: '7 days'})
    
//     const data = jwt.verify(token , 'thisismynewcourse')
//     console.log(data);
// }

// myFunction()


// const password = "Justforlaugh27"
// const hashedPassword = await bcrypt.hash(password , 8)

// console.log(password);
// console.log(hashedPassword);

// const isMatch = await bcrypt.compare(password , hashedPassword);
// console.log(isMatch);

/*

    var util = require("util"); 
    var fs = require("fs");
    var formidable = require('formidable');
    var path = require('path');

    router.post("/upload", function(req, res, next){ 
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        // `file` is the name of the <input> field of type `file`
        console.log(files);
        console.log(fields);
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
    });
    form.on('error', function(err) {
        console.error(err);
    });
    form.on('progress', function(bytesReceived, bytesExpected) {
        var percent_complete = (bytesReceived / bytesExpected) * 100;
        console.log(percent_complete.toFixed(2));
    });
    form.on('end', function(fields, files) 
        // Temporary location of our uploaded file 
        var temp_path = this.openedFiles[0].path;
        // The file name of the uploaded file 
        var file_name = this.openedFiles[0].name;
        // Location where we want to copy the uploaded file 
        var new_location = 'public/images/';

        fs.readFile(temp_path, function(err, data) {
            fs.writeFile(new_location + file_name, data, function(err) {
                fs.unlink(temp_path, function(err) {
                    if (err) {
                        console.error(err);
                        } else {
                        console.log("success!");
                    }
                });
            });
        });
    });
});
*/