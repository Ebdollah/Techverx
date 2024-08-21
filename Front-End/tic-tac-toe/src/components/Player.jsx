import React, { useState } from "react";
export default function Player({ name, symbol, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editInput, setEditInput] = useState("");
  const [pname, setPname] = useState(name);
  function handleEdit() {
    if (isEditing) {
      setPname(editInput);
    }
    setIsEditing((editing) => !editing);
    // setIsEditing(!isEditing); //bad practice
  }
  function handleinput(e) {
    setEditInput(e.target.value);
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {!isEditing ? (
          <span className="player-name">{pname} </span>
        ) : (
          <input value={editInput} onChange={handleinput} />
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{!isEditing ? "Edit" : "Save"}</button>
    </li>
  );
}
