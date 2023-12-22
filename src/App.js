import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Login from "./components/Login";
import Header from "./components/notes/Nav.js";
import Home from "./components/notes/Home.js";
import CreateNote from "./components/notes/CreateNote.js";
import EditNote from "./components/notes/Edit.js";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const token = localStorage.getItem("tokenStore");
    if (token) {
      try {
        const verified = await axios.get(
          "http://localhost:9000/api/user/verify",
          {
            headers: { "x-auth-token": token },
          }
        );
        console.log(verified);
        setIsLogin(verified.data);
        if (verified.data === false) return localStorage.clear();
      } catch (error) {
        console.error("Error during verification:", error);
        setIsLogin(false);
      }
    } else {
      setIsLogin(false);
    }
  };

  return (
    <div className="App">
      {isLogin ? (
        <div className="notes-page">
          <Header setIsLogin={setIsLogin} />
          <section>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateNote />} />
              <Route path="/edit/:id" element={<EditNote />} />
            </Routes>
          </section>
        </div>
      ) : (
        <Login setIsLogin={setIsLogin} />
      )}
    </div>
  );
}

export default App;
