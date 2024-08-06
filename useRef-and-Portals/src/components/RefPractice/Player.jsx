import React,{useState, useRef} from "react";

export default function Player() {
  const [submitted, setSubmitted] = useState(false);
  const inputValue = useRef()
  
  const handleSubmit = ()=>{
    setSubmitted(inputValue.current.value);
  }
  return (
    <section id="player">
      <h2>Welcome {submitted ? submitted : 'unknown entity'}</h2>
      <p>
        <input type="text"  ref={inputValue} />
        <button onClick={handleSubmit}>Set Name</button>
      </p>
    </section>
  );
}
