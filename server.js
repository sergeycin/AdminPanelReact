const express = require('express')
const config = require('config')
const mongose = require('mongoose')
const path = require('path')
const app = express()
const User = require('./models/User')
let fs = require('fs');


exports.UserObject = User;


const PORT =  8000

app.use(express.json({extended: true}))
 app.use('/api/auth', require('./adminControllers/auth.controller'))
//  app.use('/api/link',require('./routes/link.routes'))
//  app.use('/t', require('./routes/redirect.routes'))   




// Настройки для delpoy
if(process.env.NODE_ENV === 'production'){
    app.use('/admin',express.static(`${__dirname}/adminview/build`));


    app.get('/admin', (req,res)=>{
        res.sendFile(path.resolve(`${__dirname}/adminview/build/index.html`))
    } )

    app.get('/', (req,res)=>{
        res.sendFile(path.resolve(`${__dirname}/client/index.html`))
    } )
}




async function start(){
    try{
     
        
       await mongose.connect(config.get('mongoUrl'),{
        useNewUrlParser: true, useUnifiedTopology: true
       })
       app.listen(8000, (req,res) => console.log(`Server started on PORT${PORT}`))
      
    
    }catch(e){
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()