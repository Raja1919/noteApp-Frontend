import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const { id: note_Id } = useParams();

  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem("tokenStore");
      if (note_Id) {
        try {
          const res = await axios.get(
            `https://noteapp-backend-ib5u.onrender.com/api/notes/get/${note_Id}`,
            {
              headers: { "x-auth-token": token },
            }
          );

          setTitle(res.data.title);
          setContent(res.data.content);
          setDate(new Date(res.data.date).toISOString().split("T")[0]);
          setId(res.data._id);
        } catch (error) {
          console.error("Error fetching note:", error);
        }
      }
    };
    getNote();
  }, [note_Id]);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onChangeDate = (e) => {
    setDate(e.target.value);
  };

  const editNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const newNote = {
          title,
          content,
          date,
        };

        await axios.put(
          `https://noteapp-backend-ib5u.onrender.com/api/notes/update/${id}`,
          newNote,
          {
            headers: { "x-auth-token": token },
          }
        );

        return navigate("/");
      }
    } catch (err) {
      console.error("Error editing note:", err);
      navigate("/");
    }
  };

  return (
    <div className="create-note">
      <h2>Edit Note</h2>
      <form onSubmit={editNote} autoComplete="off">
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
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={onChangeDate}
          />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Edit;
