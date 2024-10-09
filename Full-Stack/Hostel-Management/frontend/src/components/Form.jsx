import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";

function Form({ route, method }) {  //route is either route is login or register("/login or "/register")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();


    try{
        const res = await api.post(route, {username, password})
        console.log(res)
        if(method === "login"){
            localStorage.setItem(ACCESS_TOKEN, res.data.access)
            localStorage.setItem(REFRESH_TOKEN, res.data.access)
            navigate("/")
        }
        else{
            navigate("/login")
        }
    } catch(error){
        alert("not passed " + error)
    } finally {
        setLoading(false) 
    }

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 max-w-sm mx-auto bg-white shadow-md rounded-lg"
    >
      <h1 className="text-2xl font-semibold text-center mb-4">{name}</h1>
      <input
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button
        className={`p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        type="submit"
        disabled={loading}
      >
        {loading ? "Loading..." : name}
      </button>
    </form>
  );
}

export default Form;
