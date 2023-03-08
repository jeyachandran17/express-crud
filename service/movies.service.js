import { query } from "express";
import { ObjectId } from "mongodb";
import { client } from "../index.js";

export async function updateMovieById(id, data) {
  return await client.db("b42wd2").collection("movies").updateOne({ _id: new ObjectId(id)}, { $set: data });
}
export async function createMovies(data) {
  return await client.db("b42wd2").collection("movies").insertMany(data);
}
export async function deleteMovieById(id) {
  return await client.db("b42wd2").collection("movies").deleteOne({ _id: new ObjectId(id)});
}
export async function getMovieById(id) {
  return await client.db("b42wd2").collection("movies").findOne({ _id: new ObjectId(id)});
}
export async function getMovies(query) {
  return await client.db("b42wd2").collection("movies").find(query).toArray();
}
