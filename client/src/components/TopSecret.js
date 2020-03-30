import React, { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

export const TopSecret = () => {
  const [secret, setSecret] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/restricted/top-secret")
      .then(res => setSecret(res.data))
      .catch(err => console.error(err));
  }, []);
  return (
    <>
      <h1>{secret}</h1>
    </>
  );
};
