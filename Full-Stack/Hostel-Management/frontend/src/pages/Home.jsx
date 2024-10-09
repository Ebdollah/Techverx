import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Note from "../components/Note";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getNotes();
}, []);

  const getNotes = () => {
    api
      .get("api/notes/")
      .then((res) => res.data)
      .then((data) => setNotes(data))
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
        .delete(`/api/notes/delete/${id}/`)
        .then((res) => {
            if (res.status === 204) alert("Note deleted!");
            else alert("Failed to delete note.");
            getNotes();
        })
        .catch((error) => alert(error));
};

  const createNote = (e) => {
    e.preventDefault();
    api
        .post("/api/notes/", { content, title })
        .then((res) => {
            if (res.status === 201) alert("Note created!");
            else alert("Failed to make note.");
            navigate('/')
        })
        .catch((err) => alert(err));
};

  if (!notes) {
    return <div>Nothing here</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Notes</h2>
      {notes.map((note) => (
        <Note note={note} onDelete={deleteNote} key={note.id} />
      ))}
    </div>
  
    <h2 className="text-2xl font-bold mb-4">Create a Note</h2>
    <form onSubmit={createNote} className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md">
      <label htmlFor="title" className="font-semibold text-gray-700">
        Title:
      </label>
      <input
        type="text"
        id="title"
        name="title"
        required
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <label htmlFor="content" className="font-semibold text-gray-700">
        Content:
      </label>
      <textarea
        id="content"
        name="content"
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
  
      <input
        type="submit"
        value="Submit"
        className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition cursor-pointer"
      />
    </form>
  </div>
   );
}

export default Home;
