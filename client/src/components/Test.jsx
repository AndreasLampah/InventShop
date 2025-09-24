import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Test = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/test");
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>text dari backend</h1>
      <p>{message}</p>
    </div>
  );
};

export default Test;
