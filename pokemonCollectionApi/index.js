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
  const pokemonContainer = [];
  let counter = 1;
  while (counter != 50 + 1) {
    try {
      const pokemon = await getPokemon(counter);
      pokemonContainer.push(pokemon);
    } catch (e) {
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
    } catch (e) {
      console.log(e);
    }
    startId++;
  }
  res.send(pokemonContainer);
});

// app.post("/search", async (req, res) => {
//   const { searchQuery } = req.body;
//   const findText = searchQuery.toLowerCase();
//   console.log(findText);
//   const pokemonContainer = [];
//   let counter = 1;
//   while (counter != 493 + 1) {
//     try {
//       const pokemon = await getPokemon(counter);
//       if (pokemon.name.includes(findText)) {
//         console.log(pokemon.name.includes(findText));
//         pokemonContainer.push(pokemon);
//         console.log(pokemon);
//       }
//     } catch (e) {
//       console.log(e);
//     }
//     counter++;
//   }
//   res.send(pokemonContainer);
// });

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
        console.log(pokemon.name.includes(findText));
        pokemonContainer.push(pokemon);
        console.log(pokemon.name);
      }
    } catch (e) {
      console.log(e);
    }
    counter++;
  }
  res.send(pokemonContainer);
});

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

app.get("/random-pokemon", async (req, res) => {
  try {
    const pokemon = await getPokemon(getRandomNumber(1, 493));
    res.send(pokemon);
  } catch (e) {
    console.log(e);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Now listening on port ${process.env.PORT}`);
});
