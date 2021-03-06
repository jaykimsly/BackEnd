const express = require('express')
const path =  require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb://localhost:27017/login-app-db',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()
app.use('/',express.static(path.join(__dirname,'static')))

app.use(bodyParser.json())

app.post('/api/register', async (req,res) => {
    const{ username,password: plainTextPassword } = req.body

    
    const password = await bcrypt.hash(plainTextPassword,10)

    try {
        const responce = await User.create({
            username,
            password
        })
    } catch (error) {
        console.log(error.message)
        return res.json({status:'errror'})
    } 
    //Hashing the passwordds
    res.json({status:'ok'})
})
 
app.listen(9999, () => {
    console.log('Server up at 9999')
})    