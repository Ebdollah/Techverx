import React,{useState} from "react";

export default function Player() {
  const [inputName, setinputName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const handleChange= (e) =>{
    setSubmitted(false);
    setinputName(e.target.value);
  }
  const handleSubmit = ()=>{
    setSubmitted(true);
  }
  return (
    <section id="player">
      <h2>Welcome {submitted ? inputName : 'unknown entity'}</h2>
      <p>
        <input type="text" value={inputName} onChange={handleChange} />
        <button onClick={handleSubmit}>Set Name</button>
      </p>
    </section>
  );
}
