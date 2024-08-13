const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { getPokemon } = require("./fetchPokemon");
const app = express();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const corsOptions = {
  origin: "https://pokemon-collection-client.vercel.app",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Allows web servers to specify which origins (domains) can access their resources
app.use(express.json()); // Add this line to parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// // Log headers middleware
// app.use((req, res, next) => {
//   res.on("finish", () => {
//     console.log("Response Headers:", res.getHeaders());
//   });
//   next();
// });

app.post("/send-message", (req, res) => {
  const { contactForm } = req.body;
  const { name, email, subject, message } = contactForm;
  transporter.sendMail(
    {
      from: process.env.EMAIL_USER, // sender address
      to: process.env.EMAIL_USER, // recipient email address - me
      subject: subject,
      text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`, // plain text body
      html: `<p>From: ${name} &lt;${email}&gt;<br>Subject: ${subject}<br><br>${message}</p>`, // html body
    },
    (err, info) => {
      if (err) {
        console.log("Error occurred. " + err.message);
        return process.exit(1);
      }
      console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      res.send(`Message sent`);
    }
  );
});

app.get("/", (req, res) => {
  res.send("success");
});

app.get("/partial-pokemon", async (req, res) => {
  const pokemonUrlContainer = [];
  let counter = 1;
  while (counter != 25 + 1) {
    pokemonUrlContainer.push(`https://pokeapi.co/api/v2/pokemon/${counter}`);
    console.log(`https://pokeapi.co/api/v2/pokemon/${counter}`);

    counter++;
  }

  const requests = pokemonUrlContainer.map((url) => fetch(url));

  try {
    const response = await Promise.all(requests);
    const data = await Promise.all(response.map((pokemon) => pokemon.json()));
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Failed to retrieve resource");
  }
});

app.post("/more-pokemon", async (req, res) => {
  const { index } = req.body;
  const pokemonUrlContainer = [];
  let startId = Number(index) + 1;
  const endId = startId + 25;
  while (startId != endId) {
    pokemonUrlContainer.push(`https://pokeapi.co/api/v2/pokemon/${startId}`);
    startId++;
  }

  const requests = pokemonUrlContainer.map((url) => fetch(url));

  try {
    const response = await Promise.all(requests);
    const data = await Promise.all(response.map((pokemon) => pokemon.json()));
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Failed to retrieve resource");
  }
});

app.get("/search", async (req, res) => {
  const searchTerm = req.query.q;
  console.log(searchTerm);
  const findText = searchTerm.toLowerCase();
  const pokemonContainer = [];
  let counter = 1;
  while (counter != 493 + 1) {
    try {
      const pokemon = await getPokemon(counter);
      if (pokemon.name.includes(findText)) {
        pokemonContainer.push(pokemon);
        console.log(pokemon.name);
      }
    } catch (e) {
      console.log(e);
      res.status(500).send("Failed to retrieve resource");
    }
    counter++;
  }
  res.json(pokemonContainer);
});

app.get("/selected-pokemon/:id", async (req, res) => {
  const pokemonId = req.params.id;
  try {
    const pokemon = await getPokemon(pokemonId);
    res.status(200).json(pokemon);
  } catch (e) {
    console.log(e);
    res.status(500).send("Failed to retrieve resource");
  }
});

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

app.get("/random-pokemon", async (req, res) => {
  try {
    const pokemon = await getPokemon(getRandomNumber(1, 493));
    res.json(pokemon);
  } catch (e) {
    console.log(e);
    res.status(500).send("Failed to retrieve resource");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Now listening on port ${process.env.PORT}`);
});
