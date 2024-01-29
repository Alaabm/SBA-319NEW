import express from 'express';
import db from '../db/conn.mjs';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Query collection middleware
router.use(async (req, res, next) => {
    req.comments = await db.collection('comments');
    next();
});


//Get a comment post entry
router.get("/:id", async (req, res) => {
    let collection = await db.collection("comments")
    let query = { _id: new ObjectId(req.params.id) }
    let result = await collection.findOne(query);

    if (!result) res.send ("Not Found").status(404)
    else res.send(result).status(200);
});

router.get("/", async (req, res) => {
    try {
        let result = await req.comments.find().toArray();
        return res.send(result).status(200);
    } catch (error) {
        res.send({ error: 'Error fetching comments' }).status(500);
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


export default router;



