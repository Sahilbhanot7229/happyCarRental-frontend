import React, { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import '../style/contact.css'

export default function ContactUs() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    emailjs.send(
      'service_a5jtfjf', 
      'template_891qnyv', 
      {
        to_name: "Admin",
        from_name: credentials.name,
        from_email: credentials.email,
        message: credentials.message,
      },
      'GXgLyu0sHiBx8U5wl' 
    ).then((response) => {
      setFeedback({ type: "success", message: "Message sent successfully" });
      setCredentials({ name: "", email: "", message: "" });
      setTimeout(() => setFeedback({ type: "", message: "" }), 5000);
    }).catch((error) => {
      setFeedback({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "message") {
      const words = value.split(/\s+/).filter(Boolean);
      if (words.length <= 100) {
        setCredentials({ ...credentials, message: value });
      }
    } else {
      setCredentials({ ...credentials, [name]: value });
    }
  };

  const wordCount = (text) => text.split(/\s+/).filter(Boolean).length;

  return (
    <div>
     <div className="contact-page">
  <div className="contact-section">
    <img src={"./contactus.jpeg"} alt="Event" />
    <div className="contact-details">
      <h2>Contact Us</h2>
      {feedback.message && (
        <div
          className={`alert ${
            feedback.type === "success" ? "alert-success" : "alert-danger"
          }`}
          role="alert"
        >
          <h2>{feedback.message}</h2>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={credentials.name}
          onChange={onChange}
        />

        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={credentials.email}
          onChange={onChange}
        />

        <label htmlFor="message" className="form-label">
          Message (up to 100 words):
        </label>
        <textarea
          className="form-control"
          name="message"
          rows="4"
          value={credentials.message}
          onChange={onChange}
        ></textarea>
        <p>Word Count: {wordCount(credentials.message)} / 100</p>

        <button type="submit" className="m-3 btn btn-success">
          Submit
        </button>
      </form>
    </div>
  </div>
</div>

    </div>
  );
}
