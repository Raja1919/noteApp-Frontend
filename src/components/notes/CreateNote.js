import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onChangeDate = (e) => {
    setDate(e.target.value);
  };

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      console.log("Token:", token);

      if (token) {
        if (!title || !content || !date) {
          console.error("Title, content, and date are required");
          return;
        }

        const newNote = {
          title,
          content,
          date,
        };

        const response = await axios.post(
          "https://noteapp-backend-ib5u.onrender.com/api/notes/post",
          newNote,
          {
            headers: { "x-auth-token": token },
          }
        );

        console.log("API Response:", response.data);

        navigate("/");
      }
    } catch (err) {
      console.error("Error creating note:", err);
    }
  };

  return (
    <div className="create-note">
      <h2>Create Note</h2>
      <form onSubmit={createNote} autoComplete="off">
        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={title}
            id="title"
            name="title"
            required
            onChange={onChangeTitle}
          />
        </div>

        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            value={content}
            id="content"
            name="content"
            required
            rows="10"
            onChange={onChangeContent}
          />
        </div>

        <label htmlFor="date">Date: {date} </label>
        <div className="row">
          <input type="date" id="date" name="date" onChange={onChangeDate} />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreateNote;
