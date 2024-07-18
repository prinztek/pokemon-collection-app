const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { getPokemon } = require("./fetchPokemon");
const app = express();
app.use(cors());


app.get("/partial-pokemon", async (req, res) => {
  const pokemonContainer = [];
  let counter = 1;
  while (counter != 20 + 1) {
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

app.get("/other-pokemon", async (req, res) => {
  const pokemonContainer = [];
  let counter = 21;
  while (counter != 1025 + 1) {
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

app.listen(process.env.PORT, () => {
  console.log(`Now listening on port ${process.env.PORT}`);
});

