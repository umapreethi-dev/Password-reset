import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
const PORT = "3001";

const MONGO_URL = "mongodb://localhost";

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected");
  return client;
}

const client = await createConnection();

app.post("/sign_up", async function (req, res) {
  const userData = req.body;
  const result = await client
    .db("test")
    .collection("pass-reset")
    .insertOne(userData, function (err, collection) {
      if (err) throw err;
      console.log("Record inserted successfully");
    });
  res.send(result);
});
app.listen(PORT, function () {
  console.log("Listening on:", PORT);
});
