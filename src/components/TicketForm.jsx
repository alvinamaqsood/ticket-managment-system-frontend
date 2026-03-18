import React, { useState } from "react";
import { createTicket } from "../axios"; 

function TicketForm({ onAddTicket }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createTicket(form); 
      const newTicket = res.data;

      
      if (onAddTicket) onAddTicket(newTicket);

     
      setForm({ name: "", email: "", subject: "", description: "" });
    } catch (err) {
      console.error("Failed to create ticket:", err);
      alert("Error creating ticket. Check console.");
    }
  };

  return (
    <div className="card p-3 mb-4">
      <h5>Create Ticket</h5>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
        />
        <textarea
          className="form-control mb-2"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        ></textarea>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default TicketForm;