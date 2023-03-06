import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
// const express = require("express"); // "type": "commonjs"
import express from "express"; // "type": "module"
import { MongoClient } from "mongodb";
const app = express();


const PORT = 4000;

const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 Node js🎊✨🤩");
});


app.get("/movies",async function (request, response) {
  // Cursor -> Pagination (20) | Cursor -> Array (toArray())
  const movies = await client.db("b42wd2").collection("movies").find({}).toArray();
  console.log(movies)
  response.send(movies);
})

app.get("/movies/:id",async function (request, response) {
  const { id } = request.params;
    // const movie = movies.filter((ele)=>ele.id === id)    // filter is get the values by array
    // const movie = movies.find((ele)=>ele.id === id)     // find is get the value by particuler value
    // console.log(id);
  const movie = await client.db("b42wd2").collection("movies").findOne({ id: id });
  movie ? response.send(movie) : response.status(404).send({ message: "Movie not found" });
})

// express.json () -> middleware
app.post("/movies",express.json() ,async function (request, response) {
  const data = request.body;
  console.log(data);

  const result = await client.db("b42wd2").collection("movies").insertMany(data);
  response.send(result);
})

//  delete
app.delete("/movies/:id",async function (request, response) {
    const { id } = request.params;
    // console.log(id);
  const result = await client.db("b42wd2").collection("movies").deleteOne({ id: id });
    result.deletedCount >=1 ? response.send({message:"Movie deleted successfully"}) : response.status(404).send({ message: "Movie not found" });
})

// Update
app.put("/movies/:id", express.json(), async function (request, response) {
  const { id } = request.params;
  const data = request.body;
  console.log(data);
  console.log(id);

  const result = await client.db("b42wd2").collection("movies").updateOne({ id: id }, { $set: data }); 
  response.send(result);
})

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
