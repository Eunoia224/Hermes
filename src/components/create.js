import React, { useState } from "react";
import { useNavigate } from "react-router";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function Create() {
  let postTime;
  // eslint-disable-next-line no-unused-vars
  const [tempData, setTempData] = useState("");
  const [form, setForm] = useState({
    title: "",
    date: getTime(),
    editDate: "",
    author: "",
    content: "",
  });
  // console.log(tempData)

  const navigate = useNavigate();
  function getTime() {
    postTime = new Date().toLocaleString();
    return postTime;
  }

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  function saveNote(e, editor) {
    const data = editor.getData();
    form.content = data
    setTempData(data);
  } 

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPost = { ...form };

    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({
      title: "",
      date: "",
      author: "",
      content: "",
    });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div className="create">
      <h3 className="create-txt">Create New Post</h3>
      <form onSubmit={onSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="author">Author Name</label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={form.author}
            required
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
            required
            onChange={(e) => updateForm({ title: e.target.value })}
          />
        </div>
      </form>
      <div class="editor editor-container">
        <CKEditor editor={ClassicEditor} onChange={saveNote} id="content" />
      </div>
      <div className="form-group ">
        <input
          type="submit"
          value="Create Post"
          className="btn btn-primary"
          onClick={onSubmit}
        />
      </div>
    </div>
  );
}
