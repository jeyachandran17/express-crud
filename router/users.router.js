import express from "express"; 
import { createUser } from "../service/users.service.js";
const router = express.Router();
import bcrypt from "bcrypt";

async function generateHashedPassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password,salt);
  console.log(salt);
  console.log(hashedPassword);
  return hashedPassword; 
}

router.post("/signup",async function (request, response) {
  const { username, password } = request.body;
  const hashedPassword = await generateHashedPassword(password); // call the generateHashedPassword
  const result = await createUser({
    username: username,
    password: hashedPassword
  });
  response.send(result);
})


export default router;


