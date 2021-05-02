const express = require('express')
const db = require('./Database/mongoDbAtlas')

const app = express()
app.use(express.json())

const cors = require('cors')
const { ObjectId } = require('mongodb')

//import { ObjectId } from "mongodb"
app.use(cors())


//To enable shairing between react and node , have to enable cross origin shairing
//Have to enable it for a particular domain server
//npm install --save cors
// and import into node server


app.get("/authentication", async (req, res) => {
    // console.log(typeof(req.query.email))
    // console.log(typeof(req.query.password))
    // console.log(req.query.email)
    // console.log(req.query.password)
    let email = req.query.email
    let password = req.query.password
    let result = await db.authcheck(email, password)
    res.send(result)
    // res.send("Hello")
})
app.get("/getAllTasks", async (req, res) => {

    console.log("test" + req.query)
    const emailToTask = req.query.email
    let result = await db.fetchAll(emailToTask)
    res.send(result)
})

app.get("/getTaskByID", async (req, res) => {

    console.log("test" + typeof(req.query._id))
    const id = req.query._id
    console.log(id)

    let result = await db.getTaskByID(id)
    res.send(result)
})

app.post("/addITasks", async (req, res) => {
    console.log(req.body)
    const taskToAdd = req.body
    const date = new Date(req.body.dayTime)
    // console.log(date.getUTCFullYear() +" "+date.getTime())

   const result = await db.addnewTask(taskToAdd)
    res.send(result)
    //res.send({ message: "Authenticated" })
})
app.put("/updateReminder", async (req, res) => {
    let updatebody = req.body
    console.log(updatebody)
   let result = await db.upRemind(updatebody)
    res.send(result)

})
app.put("/updateTask", async (req, res) => {
    let updatebody = req.body
    console.log(updatebody)
    let result = await db.upTask(updatebody)
    res.send(result)

})
app.delete('/delServiceByID',async (req, res) => {
    let id = req.body
    console.log(id)
    let result = await db.delTaskrById(id)
    res.send(result)

})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log("Server is live")
})
