var express = require("express");
var cors = require("cors");
var app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7qdyh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const doctorCollection = client.db("doctorio").collection("doctor");
    const appointmentCollection = client
      .db("doctorio")
      .collection("appointment");

    // Doctor get all Api code start Here
    app.get("/doctor", async (req, res) => {
      const doctor = await doctorCollection.find({}).toArray();
      res.send(doctor);
    });

    // appointment post api code start here
    app.post("/appointment", async (req, res) => {
      const appointment = req.body;
      const doc = appointment;
      const result = await appointmentCollection.insertOne(doc);
      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Doctoroi listening on port ${port}`);
});
