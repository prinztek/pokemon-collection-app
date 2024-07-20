import { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [contactForm , setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const onInputChange = (e) => {
    const target = e.target;
    setContactForm({...contactForm, [target.name]: target.value});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    // send contactForm to server
    console.log(contactForm);
  }

  return (
    <main>
      <form id="contact-form" onChange={onInputChange}>
        <h1 className="header-text">Contact</h1>
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="text" name="subject" placeholder="Subject" />
        <textarea type="text" name="message" placeholder="message" />
        <button onSubmit={onSubmit} type="submit" className="contact-submit-btn">Send Message</button>
      </form>
    </main>
    );
};

export default Contact;
