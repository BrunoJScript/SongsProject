import express from "express";
import cors from "cors";
import { database } from "./connect.js";

const app = express();
const PORT = 3005;

app.use(cors());

app.get("/", (request, response) => {
  response.send(
    "Hello everybody, this's the artists and songs API for this SongProject! "
  );
});

app.get("/artists", async (request, response) => {
  response.send(await database.collection("artists").find({}).toArray());
});

app.get("/songs", async (request, response) => {
  response.send(await database.collection("songs").find({}).toArray());
});

app.listen(PORT, () => {
  console.log(`Servidor esta escutando na porta ${PORT}`);
});
