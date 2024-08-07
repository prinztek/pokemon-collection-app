import "./About.css";

const About = () => {
  return (
    <main>
      <div id="about-section">
        <h1>About Pokemon Collect</h1>
        <p>
          <strong>Pokemon Collect</strong> is an application designed to display
          and interact with Pokémon data. This app is built using various modern
          web technologies including React with Vite, React Paginate, Node.js,
          Express.js, and React Router.
        </p>
        <h2>Technologies Used</h2>
        <ul>
          <li>React with Vite: For building the user interface</li>
          <li>React Paginate: For pagination functionality</li>
          <li>Node.js: For the backend server</li>
          <li>Express.js: For handling API requests</li>
          <li>React Router: For navigation and routing</li>
        </ul>
        <h2>Data Source</h2>
        <p>
          The Pokémon data is fetched from the{" "}
          <a
            href="https://pokeapi.co/"
            target="_blank"
            rel="noopener noreferrer"
          >
            PokéAPI
          </a>
          , an open RESTful API created by Paul Hallett and other contributors
          around the world. Pokémon and Pokémon character names are trademarks
          of Nintendo.
        </p>
        <h2>Credits</h2>
        <p>This project uses the following resources: </p>
        <ul>
          <li>PokéAPI for the Pokémon data</li>
          <li>Images and names of Pokémon are trademarks of Nintendo</li>
        </ul>
      </div>
    </main>
  );
};

export default About;
