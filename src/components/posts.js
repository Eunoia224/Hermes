import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import parse from 'html-react-parser';

export default function Edit() {
  const [form, setForm] = useState({
    title: "",
    date: "",
    editDate: "",
    author: "",
    content: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:5000/record/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  return (
    <div className="post">
     
      <h1 className="post-title">{parse(form.title)}</h1>
      <h3 className="post-author">by {parse(form.author)}</h3>
      <small className="post-date">at {parse(form.date)}</small>
      <div className="post-content">{parse(form.content)}</div>
    </div>
  );
}
