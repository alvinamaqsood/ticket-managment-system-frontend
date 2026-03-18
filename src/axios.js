
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", 
});


export const getTickets = () => API.get("/tickets");
export const getTicketById = (id) => API.get(`/tickets/${id}`);
export const createTicket = (data) => API.post("/tickets", data);
export const updateTicketStatus = (id, status) => API.put(`/tickets/${id}`, { status });
export const deleteTicketById = (id) => API.delete(`/tickets/${id}`); 