import express from "express"; 
import { getMovies, getMovieById, createMovies, deleteMovieById, updateMovieById } from "../service/movies.service.js";
const router = express.Router();
import { auth } from "../middleware/auth.js";

router.get("/",  async function (request, response) {
  console.log(request.query);

  if (request.query.rating) {
    request.query.rating = +request.query.rating;
  }

  // Cursor -> Pagination (20) | Cursor -> Array (toArray())
  const movies = await getMovies(request.query);
  // console.log(movies)
  response.send(movies);
})

router.get("/:id",async function (request, response) {
  const { id } = request.params;
    // const movie = movies.filter((ele)=>ele.id === id)    // filter is get the values by array
    // const movie = movies.find((ele)=>ele.id === id)     // find is get the value by particuler value
    // console.log(id);
  const movie = await getMovieById(id);
  movie ? response.send(movie) : response.status(404).send({ message: "Movie not found" });
})

// express.json () -> middleware
router.post("/",async function (request, response) {
  const data = request.body;
  console.log(data);

  const result = await createMovies(data);
  response.send(result);
})

//  delete
router.delete("/:id", async function (request, response) {
    const { id } = request.params;
    // console.log(id);
  const result = await deleteMovieById(id);
    result.deletedCount >=1 ? response.send({message:"Movie deleted successfully"}) : response.status(404).send({ message: "Movie not found" });
})

// Update
router.put("/:id", async function (request, response) {
  const { id } = request.params;
  const data = request.body;
  // console.log(data);
  // console.log(id);

  const result = await updateMovieById(id, data); 
  response.send(result);
})

export default router;


