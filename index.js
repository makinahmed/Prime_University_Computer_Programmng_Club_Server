const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");

const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.m8c0v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
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
  } finally {
    // await client.close();
  }
}
run();

app.get("/", (req, res) => {
  res.send("Running PUCPC on port ");
});

app.listen(port, () => {
  console.log("Listening on ther ", port);
});

// GzLJKUqtDPkAfF8P;
// PUCPC;
