const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { getPokemon } = require("./fetchPokemon");
const app = express();
app.use(cors()); // Allows web servers to specify which origins (domains) can access their resources
app.use(express.json()); // Add this line to parse JSON bodies
app.use(express.urlencoded({ extended: true }));

app.get("/",  (req, res) => {
  res.send("success");
});

app.get("/partial-pokemon", async (req, res) => {
  const pokemonContainer = [];
  let counter = 1;
  while (counter != 50 + 1) {
    try {
      const pokemon = await getPokemon(counter);
      pokemonContainer.push(pokemon);
    } catch(e) {
      console.log(e);
    }
    counter++;
  }
  res.send(pokemonContainer);
});

app.post("/more-pokemon", async (req, res) => {
  const { index } = req.body;
  const pokemonContainer = [];
  let startId = Number(index) + 1;
  const endId = startId + 25;
  while (startId != endId) {
    try {
      const pokemon = await getPokemon(startId);
      pokemonContainer.push(pokemon);
    } catch(e) {
      console.log(e);
    }
    startId++;
  }
  res.send(pokemonContainer);
});

app.post("/search", async (req, res) => {
  const { searchQuery } = req.body;
  const findText = searchQuery.toLowerCase();
  console.log(findText);
  const pokemonContainer = [];
  let counter = 1;
  while (counter != 493 + 1) {
    try {
      const pokemon = await getPokemon(counter);
      if (pokemon.name.includes(findText)) {
        console.log(pokemon.name.includes(findText));
        pokemonContainer.push(pokemon);
        console.log(pokemon);
      }
    } catch(e) {
      console.log(e);
    }
    counter++;
  }
  res.send(pokemonContainer);
});

app.post("/randompokemon", async (req, res) => {
  const {pokemonId} = req.body;
  let counter = 21;
  try {
    const pokemon = await getPokemon(pokemonId);
    res.send(pokemon);
  } catch(e) {
    console.log(e);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Now listening on port ${process.env.PORT}`);
});

