import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

const Record = (props) => (
  <div className="home-container">
    <Link to={`/posts/${props.record._id}`}>
    <h3 className="home-title">{props.record.title}</h3>
    <h4 className="home-author">
      <small>by </small>
      {props.record.author}
    </h4>
    <small className="home-date">in {props.record.date}</small>

    <p className="home-content">{parse(props.record.content)}</p>
    </Link>
    <div className="home-controls">
      <Link to={`/edit/${props.record._id}`}>
        <button className="btn btn-edit">
          <span class="material-symbols-outlined">edit</span>
        </button>
      </Link>
      <button
        className="btn btn-delete"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        <span class="material-symbols-outlined">delete</span>
      </button>
    </div>
  </div>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/record/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return;
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div className="all-posts">
      <h2>All posts</h2>
      {records.length > 0 ? recordList(): <p className="no-post">No posts yet</p>}
    </div>
  );
}
