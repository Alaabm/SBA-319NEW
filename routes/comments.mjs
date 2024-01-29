import express from 'express';
import db from '../db/conn.mjs';
import { ObjectId } from 'mongodb';

const router = express.Router();

//BASE URL
//localhost:5050/comments

// Query collection middleware
router.use(async (req, res, next) => {
    req.comments = await db.collection('comments');
    next();
});

//Create a single comment entry
router.post("/" , async (req, res) => {
    let collection = await db.collection('comments');
    let newDocument = req.body

    let result = await collection.insertOne(newDocument);
    if (!result) res.send('Bad Request').status(400);
    else res.send('result').status(200);
})


//Get a comment post entry
router.get("/:id", async (req, res) => {
    let collection = await db.collection("comments")
    let query = { _id: new ObjectId(req.params.id) }
    let result = await collection.findOne(query);

    if (!result) res.send ("Not Found").status(404)
    else res.send(result).status(200);
});

//Route to fetch all comments
router.get("/", async (req, res) => {
    try {
        let result = await req.comments.find().toArray();
        return res.send(result).status(200);
    } catch (error) {
        res.send({ error: 'Error fetching comments' }).status(500);
    }
});

//Delete a single data entry
router.delete("/:id", async (req, res) => {
    let collection = await db.collection('comments');
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.deleteOne(query);

    if (!result) res.send ("Not Found").status(404)
    else res.send(result).status(200);
});

router.use((req, res, next) => {
    console.log('Request made to /comments');
    next();
});

router.route('/')  
    .get((req, res) => {
        res.json(comments)
    })


export default router;



