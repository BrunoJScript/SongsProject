import { MongoClient } from "mongodb";

const URI =
  "mongodb+srv://BrunoJscript:Openthedoor1@cluster0.isp2arw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(URI);

export const database = client.db("SpotifyProject");

//const database = client.db("SpotifyProject");
//const songCollection = await database.collection("songs").find({}).toArray();

//console.log(songCollection);
