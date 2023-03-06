import express from "express"; 
import { client } from "../index.js";
const router = express.Router();

router.get("/", async function (request, response) {
  // Cursor -> Pagination (20) | Cursor -> Array (toArray())
  const movies = await client.db("b42wd2").collection("movies").find({}).toArray();
  console.log(movies)
  response.send(movies);
})

router.get("/:id",async function (request, response) {
  const { id } = request.params;
    // const movie = movies.filter((ele)=>ele.id === id)    // filter is get the values by array
    // const movie = movies.find((ele)=>ele.id === id)     // find is get the value by particuler value
    // console.log(id);
  const movie = await client.db("b42wd2").collection("movies").findOne({ id: id });
  movie ? response.send(movie) : response.status(404).send({ message: "Movie not found" });
})

// express.json () -> middleware
router.post("/",async function (request, response) {
  const data = request.body;
  console.log(data);

  const result = await client.db("b42wd2").collection("movies").insertMany(data);
  response.send(result);
})

//  delete
router.delete("/:id",async function (request, response) {
    const { id } = request.params;
    // console.log(id);
  const result = await client.db("b42wd2").collection("movies").deleteOne({ id: id });
    result.deletedCount >=1 ? response.send({message:"Movie deleted successfully"}) : response.status(404).send({ message: "Movie not found" });
})

// Update
router.put("/:id", async function (request, response) {
  const { id } = request.params;
  const data = request.body;
  // console.log(data);
  // console.log(id);

  const result = await client.db("b42wd2").collection("movies").updateOne({ id: id }, { $set: data }); 
  response.send(result);
})

export default router;