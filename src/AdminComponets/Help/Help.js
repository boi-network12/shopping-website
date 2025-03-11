import React, { useState } from "react";
import "./Help.css";
import { BiEnvelope, BiPhone, BiMessageDetail, BiChevronDown } from "react-icons/bi";

const Help = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    { question: "How do I reset my password?", answer: "Go to settings, click on 'Change Password' and follow the instructions." },
    { question: "How do I contact support?", answer: "You can reach us via email at support@example.com or call +1 234 567 890." },
    { question: "How do I delete my account?", answer: "Go to settings, select 'Delete Account' and confirm your action." },
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="help-container">
      <h2>Help & Support</h2>

      {/* FAQ Section */}
      <div className="faq-section">
        <h3>Frequently Asked Questions</h3>
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item" onClick={() => toggleFAQ(index)}>
            <div className="faq-question">
              {faq.question}
              <BiChevronDown className={`faq-icon ${openFAQ === index ? "open" : ""}`} />
            </div>
            {openFAQ === index && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="contact-section">
        <h3>Contact Support</h3>
        <p><BiEnvelope className="icon" /> Email: support@example.com</p>
        <p><BiPhone className="icon" /> Phone: +1 234 567 890</p>
        <button className="live-chat-btn">
          <BiMessageDetail /> Live Chat
        </button>
      </div>

      {/* Submit a Ticket */}
      <div className="ticket-section">
        <h3>Submit a Ticket</h3>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Describe your issue..." required></textarea>
          <button type="submit">Submit Ticket</button>
        </form>
      </div>
    </div>
  );
};

export default Help;
