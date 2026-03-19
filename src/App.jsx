import React, { useState } from "react";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";

function App() {
  const [tickets, setTickets] = useState([]);

  const addTicket = (ticket) => setTickets([...tickets, ticket]);

  return (
    <div className="container-fluid p-0" style={{ backgroundColor: '#5c769e' }}>
      <h2 className="text-center my-4" style={{ color: 'white' }}>Ticket Management System</h2>
      <div className="px-3">
        <TicketForm onAddTicket={addTicket} />
        <TicketList tickets={tickets} setTickets={setTickets} />
      </div>
    </div>
  );
}

export default App;
