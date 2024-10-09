import React from 'react';

function Note({ note, onDelete }) {
  const formattedDate = new Date(note.created_at).toLocaleDateString('en-US');

  return (
    <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md max-w-sm mx-auto mb-4">
      <p className="text-lg font-semibold text-gray-900 mb-2">{note.title}</p>
      <p className="text-gray-700 mb-2">{note.content}</p>
      <p className="text-sm text-gray-500 mb-4">{formattedDate}</p>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        onClick={() => onDelete(note.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default Note;
