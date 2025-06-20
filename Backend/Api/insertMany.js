import { artistArray } from "../../Frontend/src/assets/database/artists.js";
import { songsArray } from "../../Frontend/src/assets/database/songs.js";
import { database } from "./connect.js";

const newArtistArray = artistArray.map((currentArtistObj) => {
  const newArtistObj = { ...currentArtistObj };
  delete newArtistObj.id;

  return newArtistObj;
});

const newSongsArray = songsArray.map((currentSongstObj) => {
  const newSongsObj = { ...currentSongstObj };
  delete newSongsObj.id;

  return newSongsObj;
});

const songsResponse = await database
  .collection("songs")
  .insertMany(newSongsArray);
const artistResponse = await database
  .collection("artists")
  .insertMany(newArtistArray);

//console.log(songsArray);
//console.log(artistArray);
console.log(songsResponse);
console.log(artistResponse);
