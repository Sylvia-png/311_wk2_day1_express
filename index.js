const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000
const { users } = require('./state');
const counter = users.length;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

/* BEGIN - create routes here */
//Part 1: Basic routes, create the following routes:
//GET /users
app.get('/users', (req, res) => {
  res.json(users)
})

//GET /users/1
app.get('/users/:userId', (req, res) => {
  const id = req.params.userId;
  const user = users.find(user => user._id == id);
  res.json(user)
})
/*/GET /users/1
app.get('/users/1', (req, res) => {
  return res.json(users[0]);
})*/


/*POST /users
app.post('/users', (req, res) => {
  const id = users.length + 1;
  const newUser = {
    _id: id,
    name: "Bruce Wayne",
    occupation: "Superhero",
    avatar: "https://ih1.redbubble.net/image.357450728.2610/st,small,845x845-pad,1000x1000,f8f8f8.u1.jpg",
  }
  users.push(newUser);
  return res.json(newUser);
})

//* PUT /users/1
app.put('/users/1', (req, res) => {
  // change occupation
  users[0].occupation = "FBI Chief"
  return res.json(users[0]);
})*/




//POST /users
app.post('/users', (req, res) => {
  const id = counter + 1;
  console.log(req.body);
  const newUser = {
    _id: id,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar
  }
  users.push(newUser);
  return res.json(newUser);
})

//* PUT /users/1
app.put('/users/:userId', (req, res) => {
  // change occupation
  const id = req.params.userId;
  const userId = users.findIndex(user => user._id == id);
  users[userId].name = req.body.name;
  users[userId].occupation = req.body.occupation;
  users[userId].avatar = req.body.avatar;
  return res.json(users[userId]);
})

//DELETE /users/1
app.delete('/users/:userId', (req, res) => {
  const id = req.params.userId;
  var filtered = users.filter(function(user, index, arr){return user._id != id;});
  users = filtered;
  return res.send("deleted");
})

/* PUT /users/1
app.put('/users/1', (req, res) => {
  // change occupation
  users[0].occupation = "FBI Chief"
  return res.json(users[0]);
})*/





/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))





