const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
app.use(bodyParser.json());


// const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.m8c0v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.5r3wkjs.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});


// USER_NAME = pucpc;
// PASSWORD = Lgw0DZOH8rEetB3q;
//L3bDAyjYndPfzZmy


// USER_NAME = PUCPC;
// PASSWORD = GzLJKUqtDPkAfF8P;

app.get("/", (req, res) => {
  res.send("Running PUCPC on port ");
});

// client.connect()
async function run() {
  try {
    await client.connect();
    const database = client.db("PUCPCDB");
    const teachersCollection = database.collection("teachers");
    const teamCollection = database.collection("team");
    const wingCollection = database.collection("wing");
    const sliderCollection = database.collection("slider");
    const blogCollection = database.collection("blog");
    const userCollection = database.collection("user");
    //teachers
    app.post("/signup", async (req, res) => {
      const email = req.body.email;
      const newUser = req.body;
      const isUserExist = await userCollection.findOne({ email: email })
      
      if (isUserExist) {
        res.json({ message: 400 });
      } else {
        const result = await userCollection.insertOne(newUser);
        res.json({ message: 200 });
      }
    });
    app.post("/login", async (req, res) => {
      const email = req.body.email;
      const password = req.body.password;
      const newUser = req.body;
      const isUserExist = await userCollection.findOne({ email: email })
      
      if (isUserExist?.email === email && isUserExist?.password === password) {
        res.json({ message: 200 });
      } else {
        res.json({ message: 400 });
      }
    });
    //teachers
    app.get("/teachers", async (req, res) => {
      const cursor = await teachersCollection.find({}).toArray();
      res.send(cursor);
    });

    //team members

    app.get("/team", async (req, res) => {
      const cursor = await teamCollection.find({}).toArray();
      res.send(cursor);
    });
    // wingsData
    app.get("/wing", async (req, res) => {
      const cursor = await wingCollection.find({}).toArray();
      res.send(cursor);
    });

    //slider


    app.get("/slider", async (req, res) => {
      const cursor = await sliderCollection.find({}).toArray();
      res.send(cursor);
    });
    app.get("/blog", async (req, res) => {
      const cursor = await blogCollection.find({}).toArray();
      res.send(cursor);
    });
    app.get("/members", async (req, res) => {
      const cursor = await userCollection.find({}).toArray();
      res.send(cursor);
    });
  } finally {
    // await client.close();
  }
}
run();



app.listen(port, () => {
  console.log("Listening on ther ", port);
});

// GzLJKUqtDPkAfF8P;
// PUCPC;
