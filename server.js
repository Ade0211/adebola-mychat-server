const express = require("express");
const cors = require('cors')
const app = express();
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
let welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!"
}
let anotherMessage = {
  id: 1,
  from: "Ade",
  text: "hi world!"
}

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage, anotherMessage]
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});
//SEARCH
app.get("/messages/search", (req, res)=>{
  let mySearch = req.query.term;
  console.log(mySearch)
  let filteredList=messages.filter((msg)=> msg.text.toLocaleLowerCase().includes(mySearch.toLocaleLowerCase()))
  // messages.filter(obj => {obj.text.toLowerCase().includes(mySearch) ? res.json(obj.text): res.json({success:false})})
  if(filteredList)
  res.json(filteredList)
  else
  res.json({success:false})
})

//DISPLAY LATEST MESSAGES
app.get("/messages/display" , (req,res)=> {
  let counter = 0;
  let carryOn=true;
  let i=messages.length-1;
  let tenMessages=[];
 while(carryOn)
 {
   tenMessages.push(messages[i]);
   i=i-1;
   counter=counter+1;
   if(counter >= 10 || i < 0){
    carryOn = false;
   }
 }
 res.send(tenMessages);
 res.send("it works");
//  console.log(tenMessages);
 console.log("it is working");
} )
//read
app.get('/messages', function(request, response) {
  let name = request.query.from;
  console.log(name)
  response.json(messages);
});
// let form = document.getElementById("myForm");
//Create
app.post("/messages", function (req, res) {
  let msg = {
    // id:req.body.id,
  from:req.body.from,
  text:req.body.text}
  msg.timeSpent = new Date().toISOString();
  let newId = Math.max.apply(null, messages.map(x=> x.id))+ 1;
  msg.id =newId
  console.log(msg)
    if (Object.keys( msg).length === 0){ 
    res.send({status:400})
  }else{ 
    messages.push(msg);
    res.json(messages)
  }

});
//get messages by id
app.get("/messages/:id", function (req, res) {
 const {id} = req.params
 const myMessages = messages.find(e=> e.id == id);
  myMessages? res.json(myMessages): res.send("data not found");
});
//delete
app.delete("/messages/:id", function (req, res) {
  const {id}= req.params;
 messages= messages.filter(e=> e.id !=id);
  res.send(messages);
 res.send("single album deleted")
});


//update

app.patch("/messages/:id", function (req, res) {
  const {id}= req.params;
  const {from, text} = req.body
  let newMessage = {text:req.body.text,from:req.body.from};
 const updateMyMessages= messages.find(e=> e.id ==id);
  if(updateMyMessages!="" && newMessage!="") 
   {
    updateMyMessages.from = newMessage.from; 
    updateMyMessages.text = newMessage.text;
    res.status(200).send("updated")
   } 
    else{
     res.status(400).send("message not found")
    }

});

app.get('/messages', function(request, response) {
  let name = request.query.from;
  console.log(name)
  response.json(messages);
});
app.listen(8000, ()=> {
  console.log("server started on port 8000")
});