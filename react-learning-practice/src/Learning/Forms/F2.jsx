import React from "react";

export default function F2() {
  const Names = [
    { id:1 , name: "Ali" },
    { id:2 , name: "Zeb" },
    { id:3 , name: "Ahmed" },
    { id:4 , name: "Ebd" },
  ];
//   const [name, selectedName] = React.useState("Ali");
//   const [message, setMessage] = React.useState('');
  const [formData, setFormData] = React.useState({
    name:'Ali',
    message:''
  })
  const handleChange = (e)=>{
    const {name, value} = e.target;
    setFormData({[name]:value});
  }
  const [data, setData] = React.useState([])
//   const handleName = (e)=>{
//     selectedName(e.target.value);
//   }
// //   const handleMessage = (e)=>{
// //     setMessage((prev) => [...prev, e.target.value]);
// //   }
//   function handleMessage(event) {
    
//     setMessage(event.target.value);
//   }
  function handleSend(e){
    e.preventDefault(); 
    console.log(formData);
    // setData()
    // console.log("Seperate " + name,message);
    // console.log("Data is " + data);
    // setData((prev)=>[...prev,{name, message}] );
    // setData({name, message});
    // console.log("Data is " + data.name, data.message);
  }

  return (
    <div>
      <form>
        <label>
          Select Name:
          <select className="m-5 w-52 h-full" value={formData.name} onChange={handleChange}>
          {/* <option value={"Select Name"}>Select Name</option> */}
          {Names.map((n)=>(
            <option key={n.id} value={n.name}>{n.name}</option>
          )
          )}
        </select>
        </label>
        <label>
            Enter Message
            <input className="w-52 bg-slate-200 m-5" type="text" name="message" value={formData.message} onChange={handleChange} />
        </label>
        <button className="m-3 p-3 w-24 bg-red-600" onClick={handleSend} >Send</button>
      </form>
        {data.length > 0 && data.map((d)=>{
            console.log(d.name);
            console.log(d.message);
            <>
            <p>Selected Name: {d.name}</p>
            <p>Message is: {d.message}</p>
            </>
        })}

        {/* <p>Selected Name: {name}</p>
        <p>Message is: {message}</p> */}
            
            
    
      
    </div>
  );
}