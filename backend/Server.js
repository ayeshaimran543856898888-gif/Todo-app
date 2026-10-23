const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");




const port = 3000;

app.use(express.json());

app.use(cors());

mongoose
  .connect("mongodb+srv://ayeshaimran543856898888_db_user:CutE4qP9Z65tt4Gl@cluster0.dcwoev8.mongodb.net/TodoApp")
  .then(() => console.log("Database connected to MongoDB"))
  .catch((err) => console.error("Database connection error:", err));

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});


const user = mongoose.model("user", userSchema);
app.post("/auth/signup", async (req, res) => {
  console.log("Signup data ",req.body);
  try {
    const { username, email, password } = req.body;
    const isUser = await user.findOne({ email });
    if (isUser) {
      return res.status(200).json({
        message: "User already exists. You just need to LOGIN.",
        data: { username, email },
      });
    }

    const hashedpassword = await bcrypt.hash(password,10)
    const newUser = new user({ username, email, password:hashedpassword });
    await newUser.save();
    console.log("User saved:", newUser);
    return res.status(201).json({
      message: "User registered successfully. Now you can login.",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
  }
});


const JWT_SECRET = 'gkaE7XhAseyObFJJzHTG3XV2FUmfXxntJ0nbs3jLdMM'

app.post("/auth/login",async (req,res)=>{
  try {
    const {email,password} = req.body;
    const isUser = await user.findOne({email});
    if(!isUser) {
      return res.status(404).json({
        message:"User not Found.Please SignUp first.",
      })
    }
    const matchedpassword = await bcrypt.compare(password,isUser.password)

    if(!matchedpassword) {
      return res.status(401).json({
        message:"email aur password is incorrect"
      })
    }

   const token = jwt.sign(
    {
      userId:isUser._id,
      email:isUser.email,
    },
    JWT_SECRET,
    {
      expiresIn: '1h'
    }
   )

    if(isUser)
    return res.status(200).json({
      message: "Login successful",
      token: token,
      expiresIn: '1h'

    })
    
  } catch (error) {
    console.error("Login error:",error);
    return res.status(500).json({
      message:"Internal server Error"
    })
    
  }
})

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  detail:{
    type: String,
    required: true,
  }
})

const Todo = mongoose.model("Todo",todoSchema);


app.get("/todos", async(req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(
      todos.map((todo)=> ({
        id: todo._id.toString(),
        title:todo.title,
        detail:todo.detail
      }))
    );
  } catch (error) {
    console.error("GET TODO ERROR:" ,error);
    res.status(500).json({message: "Failed to Fetch todos"})
  }
  
});


app.post("/todos", async(req, res) => {
  try {
    const { title, detail} = req.body;
    const newTodo = await Todo.create({
      title,
      detail,
    })
    res.status(201).json({
        
        id: newTodo._id.toString(),
        title: newTodo.title,
        detail: newTodo.detail,
      })
  } catch (error) {
    console.error("ADD TODO ERROR:",error);
    res.status(500).json({
      message:error.message,
    })
  }
});

//


app.put("/todos/:id", async(req,res) =>{
  try {
    const {title,detail} = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {title,detail},
      {new: true, runValidators:true}
    );
    if(!updatedTodo){
      return res.status(404).json({message: "Todo not found"})
    }
    res.json({
      id: updatedTodo._id.toString(),
      title: updatedTodo.title,
      detail: updatedTodo.detail,
    })
  } catch (error) {
    res.status(500).json({message: "Failed to update todo"})
  }
})


app.delete("/todos/:id" , async(req,res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if(!deletedTodo){
      return res.status(404).json({message: "Todo not found"})
    }
    res.json({
      id: deletedTodo._id.toString(),
      title: deletedTodo.title,
      detail: deletedTodo.detail,
    })
  } catch (error) {
    res.status(500).json({message: "failed to deleted todo"})
  }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
