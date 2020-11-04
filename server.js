const express = require("express");
const cors = require("cors");
const app = express();
let bodyParser=require("body-parser");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
let customers = [
  {
    id: 0,
    name: "Jon Smith"
  },
  {
    id: 1,
    name: "Fatima Hussain"
  },
  {
    id: 2,
    name: "Carlos Santana"
  }
]
let nextIndex = 100;
app.get("/", function(request, response) {
  response.send("Welcome to CYF customers server");
});
app.get("/customers",function(request,response){
  response.send(customers);
})
app.get("/customers/:id", function(request, response) {
  const id = request.params.id;
  const recipe = customers.filter(r => r.id==id);
  if (recipe) {
    response.json(recipe);
  } else {
    response.sendStatus(404);
  }
});
//correctoin => Send customers instead of recipe.
app.post("/customers", function(request, response) {
  const recipe = request.body;
  customers.push(recipe);
  response.status(201).json(customers);
});
//correction => changed find to filter.
app.put("/customers/:id", function(request, response) {
  const id = request.params.id;
  let recipeSubmitted = request.body;
  let existingRecipe = customers.filter(r => r.id === id);
  if (existingRecipe) {
    existingRecipe = recipeSubmitted;
    console.log(existingRecipe)
    response.json(existingRecipe);
  } else {
    response.sendStatus(404);
  }
});
app.delete("/customers/:id", function(request, response) {
  const id = request.params.id // no typed id
  //indexToDelete is an array.
  const indexToDelete = customers.filter(item => item.id ==id );
  if(indexToDelete.length !=[])
    {
       if(indexToDelete[0].id>=0)
      {
        customers=customers.filter(item=> item.id!=indexToDelete[0].id)
        response.send(customers);
      }
    }
  else
      response.send({status:404})
});
app.listen(process.env.PORT);