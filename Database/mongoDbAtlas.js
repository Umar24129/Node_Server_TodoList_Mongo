const MongoClient = require("mongodb").MongoClient;

const uri = "mongodb+srv://umar_Khan:khundachoke1234@cluster0.ik1pu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const {ObjectId} = require ('mongodb')
//add monodb srv to ur own cluster on mongo atlas



let con

async function connect(service) {
  if (con) return con
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  con = client.connect()
  return con
}

async function authcheck(email, password) {
  const client = await connect()
  const database = client.db("twitch")
  const usr = await database.collection("loginDb").find({ emailmon: email, passwordmon: password }).toArray()
  
  if (usr.length < 1) {
    return { message: "Wrong email or Password" }
  } else if (usr.error) {
    return { message: "Error" }
  } else {
    return usr
  }
}
async function fetchAll(fetchemailTasks) {
  const client = await connect()
  const database = client.db("twitch")
  const usr = await database.collection("TaskDb").find({ email: fetchemailTasks }).toArray()

  if (usr.length < 1) {
    return { message: "No record Found" }
  } else if (usr.error) {
    return { message: "Some Error" }
  } else {
    return usr
  }

}

async function getTaskByID(id){
  const client = await connect()
  const database = client.db("twitch")
  const usr = await database.collection("TaskDb").find({_id:ObjectId(id)}).toArray()

  if (usr.length < 1) {
    return { message: "No record Found" }
  } else if (usr.error) {
    return { message: "Some Error" }
  } else {
    return usr
  }
}

async function addnewTask(taskToAdd) {
  const client = await connect()
  const database = client.db("twitch")


  const result = await database.collection("TaskDb").insertOne(taskToAdd)
  //check it more
  if(result.insertedCount=== 1){
    return result.insertedId
  } else return { message: "Error: Failed to write into Database" }
// console.log(result.insertedId)
// return {message:"IDK"}
}

async function upRemind(updRemindBody){
  const client = await connect()
  const database = client.db("twitch")
  const result = await database.collection("TaskDb").updateOne({ _id: ObjectId(updRemindBody._id) }, { $set:{reminder: updRemindBody.reminder}})

  if (result.modifiedCount === 0 && result.upsertedCount === 0) {
      return { message: "No changes made to the collection." }
  }
  else if (result.modifiedCount === 1) {
      return { message: "Updated one document." }
  }

}
async function upTask(upTaskbody){
  const client = await connect()
  const database = client.db("twitch")
  const result = await database.collection("TaskDb").replaceOne({ _id: updRemindBody._id }, upTaskbody)

  if (result.modifiedCount === 0 && result.upsertedCount === 0) {
      return { message: "No changes made to the collection." }
  }
  else if (result.modifiedCount === 1) {
      return { message: "Updated one document." }
  }
}

async function delTaskrById (id){
  const client = await connect()
  const database = client.db("twitch")
  let result = await database.collection('TaskDb').deleteOne({ _id: ObjectId(id._id) })
  if (result.error) {
      return { message: "Some error occured" }
  }
  else if (result.result.n !== 1) {
      return { message: "Service ID not found" }
  }
  else {
      return { message: "Services with ID " + id._id + " have been deleted" }
  }
}



module.exports = {
  authcheck,
  fetchAll,
  getTaskByID,
  addnewTask,
  upRemind,
  upTask,
  delTaskrById

}