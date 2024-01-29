import express from 'express';
import db from '../db/conn.mjs';
import { ObjectId } from 'mongodb';

const router = express.Router();


//BASE URL
//localhost:5050/users

// Query collection middleware
router.use(async (req, res, next) => {
    req.users = await db.collection('users');
    next();
});

//Create a single user entry
router.post("/" , async (req, res) => {
    let collection = await db.collection('users');
    let newDocument = req.body

    let result = await collection.insertOne(newDocument);
    if (!result) res.send('Bad Request').status(400);
    else res.send('result').status(200);
})


//Get a single user entry
//use new object id when we are using _id
router.get("/:id", async (req, res) => {
    let collection = await db.collection("users")
    let query = { _id: new ObjectId(req.params.id) }
    let result = await collection.findOne(query);

    if (!result) res.send ("Not Found").status(404)
    else res.send(result).status(200);
});

 //Route to fetch all users
router.get("/", async (req, res) => {
    try {
        let result = await req.users.find().toArray();
        return res.send(result).status(200);
    } catch (error) {
        res.send({ error: 'Error fetching users' }).status(500);
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

//Delete a single data entry
router.delete("/:id", async (req, res) => {
    let collection = await db.collection('users');
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.deleteOne(query);

    if (!result) res.send ("Not Found").status(404)
    else res.send(result).status(200);
});






export default router;

// import express from 'express';
// import db from '../db/conn.mjs';
// import { ObjectId } from 'mongodb';

// const router = express.Router();


// //BASE URL
// //localhost:5050/users

// // Query collection middleware
// router.use(async (req, res, next) => {
//     req.grades = await db.collection('users');
//     next();
// });

// //Get a single user entry
// //use new object id when we are using _id
// router.get("/:id", async (req, res) => {
//     let collection = await db.collection("users")
//     let query = { _id: new ObjectId(req.params.id) }
//     let result = await collection.findOne(query);

//     if (!result) res.send ("Not Found").status(404)
//     else res.send(result).status(200);
// });

// router.use((req, res, next) => {
//     console.log('request made to /users');
// });

// // router.routes('/')
// //         .get((req, res) => {
// //             res.json(users)
// //         })




// export default router;



// import express from 'express';
// import db from '../db/conn.mjs';
// import { ObjectId } from 'mongodb';

// const router = express.Router();

// //BASE URL
// //localhost:5050/grades

// //Get a single grade entry
// //use new object id when we are using _id
// router.get("/:id", async (req, res) => {
//     let collection = await db.collection("grades")
//     let query = { _id: new ObjectId(req.params.id) }
//     let result = await collection.findOne(query);

//     if (!result) res.send ("Not Found").status(404)
//     else res.send(result).status(200);
// });

// //Get a student grade data
// router.get('/learner/:id', async (req, res) =>{
//     let collection = await db.collection('grades');
//     let query = {learner_id: Number(req.params.id)}
//     let result = await collection.find(query).toArray()

//     if(!result) res.send('Not Found').status(404)
//     else res.send(result).status(200);
// });

// // Get a class grade data
// router.get("/class/:id", async (req, res) =>{
//     let collection = await db.collection('grades');
//     let query = {class_id: Number(req.params.id)}
//     let result = await collection.find(query).toArray()

//     if(!result) res.send('Not Found').status(404)
//     else res.send(result).status(200);
// });


// export default router;




////from other sba
// router.patch('/:id/remove', async (req, res) => {
//     let collection = req.users;
//     let query = { _id: new ObjectId(req.params.id) };

//     let result = await collection.updateOne(query, {
//     $pull: { username: req.body },
//     });

//     if (!result) res.send('Not found').status(404);
//     else res.send(result).status(200);
// });
