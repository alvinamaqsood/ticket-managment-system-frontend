import React, { useState, useEffect } from "react";
import {
  getTickets,
  getTicketById,
  updateTicketStatus,
  deleteTicketById,
} from "../axios";

function TicketList({ tickets, setTickets }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const ticketsPerPage = 20;

 
  const fetchTickets = async () => {
    try {
      const res = await getTickets();
      setTickets(res.data || res || []); 
    } catch (err) {
      console.error("Failed to fetch tickets:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  
  const viewTicket = async (id) => {
    try {
      const res = await getTicketById(id);
      setSelectedTicket(res.data);
      setShowDetail(true);
    } catch (err) {
      console.error("Failed to fetch ticket:", err.response?.data || err.message);
    }
  };


  const updateStatus = async (id, status) => {
    try {
      await updateTicketStatus(id, status);
      setTickets(tickets.map((t) => (t._id === id ? { ...t, status } : t)));
    } catch (err) {
      console.error(err);
    }
  };

 
  const deleteTicket = async (id) => {
    try {
      await deleteTicketById(id);
      setTickets(tickets.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

 
  const getStatusColor = (status) => {
    if (status === "open") return "badge bg-primary";
    if (status === "in-progress") return "badge bg-warning text-dark";
    if (status === "closed") return "badge bg-success";
    return "badge bg-secondary";
  };

  
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);
  const totalPages = Math.ceil(tickets.length / ticketsPerPage);

  return (
    <div className="card p-3 mt-3" style={{ maxHeight: "70vh", overflowY: "auto" }}>
      <h5>All Tickets</h5>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTickets.length > 0 ? (
            currentTickets.map((t) => (
              <tr key={t._id}>
                <td>{t.name}</td>
                <td>{t.subject}</td>
                <td>
                  <span className={getStatusColor(t.status)}>{t.status}</span>
                </td>
                <td>{new Date(t.createdAt).toLocaleDateString()}</td>
                <td>
                 
                  <select
                    value={t.status}
                    onChange={(e) => updateStatus(t._id, e.target.value)}
                    className="form-select mb-2"
                    style={{ width: "auto" }}
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>

                 
                  <div className="d-flex gap-1">
                    
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => viewTicket(t._id)}
                      title="View Ticket"
                    >
                      <i className="bi bi-eye"></i>
                    </button>

                    
                    <button
                      onClick={() => deleteTicket(t._id)}
                      className="btn btn-danger btn-sm"
                      title="Delete Ticket"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                No tickets available
              </td>
            </tr>
          )}
        </tbody>
      </table>

     
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`btn btn-sm mx-1 ${currentPage === i + 1 ? "btn-primary" : "btn-outline-primary"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

     
      {showDetail && selectedTicket && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ticket Detail</h5>
                <button className="btn-close" onClick={() => setShowDetail(false)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {selectedTicket.name}</p>
                <p><strong>Email:</strong> {selectedTicket.email}</p>
                <p><strong>Subject:</strong> {selectedTicket.subject}</p>
                <p><strong>Description:</strong> {selectedTicket.description}</p>
                <p><strong>Status:</strong> {selectedTicket.status}</p>
                <p><strong>Created At:</strong> {new Date(selectedTicket.createdAt).toLocaleString()}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowDetail(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicketList;