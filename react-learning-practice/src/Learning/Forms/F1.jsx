import React, { useState } from "react";

const App = () => {
  const Name = [
    { label: "Ali", value: "ali" },

    { label: "Ebdollah", value: "ebdollah" },

    { label: "Zeb", value: "zeb" },
  ];

  const [value, setValue] = React.useState(Name[0].label);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState([]);
  const [count, setCount] = useState(1);
  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleMessage = (event) => {
    setMessage(event.target.value);
  };
  const addItem = () => {
    setFormData((prevItems) => [
      ...prevItems,
      { name: value, msg: message, id: count },
    ]);
    setCount(() => count + 1);
  };
  const clearItems = (e) => {
    e.preventDefault();
    setFormData({ name: "", msg: "" });
  };
  const handleDelete = (itemss, e) => {
    console.log(itemss);
    // const updatedData = formData.filter((data) => data.name === itemss.name);
    // setFormData(updatedData);
  };
  const handleClick = (namey,e)=>{
    // const itemId = e.target.dataset;
    console.log(`Clicked item ${namey}`);
  }
  return (
    <div>
      <label>
        Name:
        <select
          className="bg-gray-200 m-3 p-1"
          value={value}
          onChange={handleChange}
        >
          {Name.map((name) => (
            <option value={name.value}>{name.label}</option>
          ))}
        </select>
      </label>
      <label>
        Enter Message
        <input
          className="w-44 m-2 bg-gray-400"
          type="text"
          value={message}
          onChange={handleMessage}
        />
      </label>
      <button className="m-2 p-1 bg-blue-400 rounded-lg w-20" onClick={addItem}>
        Send
      </button>
      <button
        className="m-2 p-1 bg-blue-400 rounded-lg w-20"
        onClick={clearItems}
      >
        Clear
      </button>

      <ul >
        {formData.length > 0 &&
          formData.map((item) => (
            <>
              <li
                className="m-8 p-2 bg-stone-400"
                // onClick={handleDelete(item)}
                onClick={()=>{
                    const updatedData = formData.filter((data) => data.name !== item.name);
                    setFormData(updatedData);
                }}
                key={item.id}
              >
                Name: {item.name} Message:{item.msg}
              </li>
            </>
          ))}
      </ul>
    </div>
  );
};

export default App;
