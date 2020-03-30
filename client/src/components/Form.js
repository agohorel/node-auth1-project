import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

export const Form = ({ type }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [welcomeMsg, setWelcomeMsg] = useState("");
  let history = useHistory();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/${type}`, formData);

      if (res.status === 200 || 201) {
        setWelcomeMsg(res.data.msg);
        const timer = setTimeout(() => {
          history.push("/top-secret");
          clearTimeout(timer);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>{welcomeMsg}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          onChange={handleChange}
          value={formData.username}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          onChange={handleChange}
          value={formData.password}
        />
        <button>{type === "login" ? "login" : "register"}</button>
      </form>
    </>
  );
};
