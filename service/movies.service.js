import { client } from "../index.js";

export async function updateMovieById(id, data) {
  return await client.db("b42wd2").collection("movies").updateOne({ id: id }, { $set: data });
}
export async function createMovies(data) {
  return await client.db("b42wd2").collection("movies").insertMany(data);
}
export async function deleteMovieById(id) {
  return await client.db("b42wd2").collection("movies").deleteOne({ id: id });
}
export async function getMovieById(id) {
  return await client.db("b42wd2").collection("movies").findOne({ id: id });
}
export async function getMovies() {
  return await client.db("b42wd2").collection("movies").find({}).toArray();
}
