import express from "express";
import "dotenv/config";


const PORT = process.env.PORT || 5050;
const app = express();

app.use(express.json());

// import grades from './routes/grades.mjs';
// app.use('/grades', grades);


import users from './routes/users.mjs';
app.use('/users', users);

import posts from './routes/posts.mjs';
app.use('/posts', posts);

import comments from './routes/comments.mjs';
app.use('/comments', comments);

//Display "Hello World... on localhost:5050"
app.get("/", (req, res) =>{
    res.send("Hello World! This is my server!!!")
});


app.listen(PORT, () => {
    console.log("All Aboard Express Ship" + " " + PORT)
})