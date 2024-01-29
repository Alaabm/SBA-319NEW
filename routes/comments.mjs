import express from 'express';
import db from '../db/conn.mjs';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.get("/:id", async (req, res) => {
    let collection = await db.collection("comments")
    let query = { _id: new ObjectId(req.params.id) }
    let result = await collection.findOne(query);

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



