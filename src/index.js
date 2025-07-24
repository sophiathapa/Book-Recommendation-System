import express from 'express';
import connect from './db/connect.js';
import User from './model/user.js';
import Book from './model/book.js';
const app = express()
app.use(express.json())
const port = 3000

connect()

// User.create({
//   name: "Sophia Thapa",
//   email: "sophia.thapa55@gmail.com",
//   password: "zillion1",
//   favoriteGenres :['comedy'],
// });

// Book.create({
//   title : "The boy in the stripped pyjamas",
//   author : "John Boyne",
//   averageRating : 5,
//   totalcounts : 10,
//   publishedDate : '2006-01-05',
//   genre : ["novel","Historical Fiction", "Children's literature"],
//   description : "The Boy in the Striped Pyjamas is a 2006 historical fiction novel by Irish novelist John Boyne",
//   language : 'English'
// })

app.get('/book', async(req, res) => {
  const data = await Book.find()
  res.send(data)
})

app.post('/create',async(req,res)=>{
  await Book.create(req.body)
  res.send({message: "book data created"})
})

app.get('/user', async(req, res) => {
  const data = await User.find()
  res.send(data)
})

app.get('/limit', async(req, res) => {
  const data = await Book.find().limit(req.query.limit||10)
  res.send(data)
})

app.get('/genre', async(req, res) => {
  const data = await Book.find({averageRating: req.query.rating})
  res.send(data)
})


app.get('/book/:id', async(req,res)=>{
  const data = await Book.findById(req.params.id)
  res.send(data)
})

app.post('/user', (req, res) => {
  User.create(req.body)
  res.send({message : "user created successfully"})
})

app.get('/user', (req, res) => {
  res.send(`name:${req.query.name} \n id:${req.query.id}`)
});


app.delete('/delete',async(req,res)=>{
  await Book.findByIdAndDelete(req.query.id)
  res.send("data deleted successfully")
})

app.put('/updateAll', async(req, res) => {
   const user = await User.findById(req.query.id)
   const newData = req.body
   await User.findByIdAndUpdate(user,newData)
   res.send({message: 'user data has been updated fully'})
})


app.patch('/update/:id', async(req, res) => {
  const user = await User.findById(req.params.id)
  user.role = 'user'
  await user.save()
  res.send({message: 'user data updated'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})