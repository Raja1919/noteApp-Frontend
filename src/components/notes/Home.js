import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState("");

  const getNotes = async (token) => {
    const response = await axios.get("https://noteapp-backend-ib5u.onrender.com/notes/get", {
      headers: { "x-auth-token": token },
    });
    setNotes(response.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    setToken(token);
    if (token) {
      getNotes(token);
    }
  }, []);

  const deleteNote = async (id) => {
    try {
      if (token && id) {
        await axios.delete(`https://noteapp-backend-ib5u.onrender.com/notes/delete/${id}`, {
          headers: { "x-auth-token": token },
        });
        getNotes(token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="note-wrapper">
      {notes.map((note) => (
        <div className="card" key={note._id}>
          <h4 title={note.title}>{note.title}</h4>
          <div className="text-wrapper">
            <p>{note.content}</p>
          </div>
          <p className="date">{new Date(note.date).toLocaleDateString()}</p>
          <div className="card-footer">
            {note.name}
            <Link to={`edit/${note._id}`}>Edit</Link>
          </div>
          <button className="close" onClick={() => deleteNote(note._id)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
