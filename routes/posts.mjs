import express from 'express';
import db from '../db/conn.mjs';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Query collection middleware
router.use(async (req, res, next) => {
    req.posts = await db.collection('posts');
    next();
});

//Get a single post entry
router.get("/:id", async (req, res) => {
    let collection = await db.collection("posts")
    let query = { _id: new ObjectId(req.params.id) }
    let result = await collection.findOne(query);

    if (!result) res.send ("Not Found").status(404)
    else res.send(result).status(200);
});

router.get("/", async (req, res) => {
    try {
        let result = await req.posts.find().toArray();
        return res.send(result).status(200);
    } catch (error) {
        res.send({ error: 'Error fetching posts' }).status(500);
    }
});




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


