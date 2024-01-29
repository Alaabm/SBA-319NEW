import express from 'express';
import db from '../db/conn.mjs';
import { ObjectId } from 'mongodb';

const router = express.Router();

//BASE URL
//localhost:5050/posts

// Query collection middleware
router.use(async (req, res, next) => {
    req.posts = await db.collection('posts');
    next();
});

//Create a single post entry
router.post("/" , async (req, res) => {
    let collection = await db.collection('posts');
    let newDocument = req.body

    let result = await collection.insertOne(newDocument);
    if (!result) res.send('Bad Request').status(400);
    else res.send('result').status(200);
})


//Get a single post entry
router.get("/:id", async (req, res) => {
    let collection = await db.collection("posts")
    let query = { _id: new ObjectId(req.params.id) }
    let result = await collection.findOne(query);

    if (!result) res.send ("Not Found").status(404)
    else res.send(result).status(200);
});

 //Route to fetch all posts
router.get("/", async (req, res) => {
    try {
        let result = await req.posts.find().toArray();
        return res.send(result).status(200);
    } catch (error) {
        res.send({ error: 'Error fetching posts' }).status(500);
    }
});

router.use((req, res, next) => {
    console.log('Request made to /comments');
    next();
});

router.route('/')  
    .get((req, res) => {
        res.json(comments)
    })






//Get a users email data
// router.get('/:id', async (req, res) =>{
//     let collection = await db.collection('posts');
//     let query = {content: String(req.params.content)}
//     let result = await collection.find(query).toArray()

//     if(!result) res.send('Not Found').status(404)
//     else res.send(result).status(200);
// });



// router.use((req, res, next) => {
//     console.log('Request made to /posts');
//     next();
// });

// router.route('/')  
//     .get((req, res) => {
//         res.json(posts)
//     })




export default router;


