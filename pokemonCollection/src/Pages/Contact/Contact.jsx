import { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const onInputChange = (e) => {
    const target = e.target;
    setContactForm({ ...contactForm, [target.name]: target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch("https://pokemon-collection-server.vercel.app/send-message", {
      method: "Post",
      body: JSON.stringify({ contactForm: contactForm }),
      headers: myHeaders,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching or processing data:", error);
      });
  };

  return (
    <main>
      <form id="contact-form" onChange={onInputChange} onSubmit={onSubmit}>
        <h1 className="header-text">Contact</h1>
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="text" name="subject" placeholder="Subject" />
        <textarea type="text" name="message" placeholder="message" />
        <button type="submit" className="contact-submit-btn">
          Send Message
        </button>
      </form>
    </main>
  );
};

export default Contact;
