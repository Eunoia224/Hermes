import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function Edit() {
  let postTime
  const [tempData, setTempData] = useState("");
 const [form, setForm] = useState({
   title: "",
   date: "",
   editDate: getTime(),
   author: "",
   content: "",
 });
//  console.log(form.)
 function saveNote(e, editor) {
   const data = editor.getData();
   form.content = data;
   setTempData(data);
 } 
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

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  
 function getTime() {
   postTime = new Date().toLocaleString();
   return postTime;
 }

  async function onSubmit(e) {
    e.preventDefault();
    const editPost = {
      title: form.title,
      author: form.author,
      date: form.date,
      editDate: getTime(),
      content: form.content,
    };
    console.log(editPost);
    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editPost),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
  }
  // This following section will display the form that takes input from the user to update the data.
  return (
    <div className="create">
      <h3>Edit Your Post</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="author">Author Name</label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={form.author}
            onChange={(e) => updateForm({ author: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
          />
        </div>
      </form>
      <div class="editor editor-container">
        <CKEditor
          editor={ClassicEditor}
          data={form.content}
          onChange={saveNote}
          id="content"
        />
      </div>
      <div className="form-group ">
        <input
          type="submit"
          value="Update Post"
          className="btn btn-primary"
          onClick={onSubmit}
        />
      </div>
    </div>
  );
}
