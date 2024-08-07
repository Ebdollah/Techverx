import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import MyContext from "../MyContext";
// import logo from "../assets/EduVerse-Logo.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTeacher, setIsTeacher] = useState(false); // New state for the checkbox
  const [error, setError] = useState(null); // New state for error message
  const { setUseridd } = useContext(MyContext); // Get setUseridd from the context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if email is verified
      if (!user.emailVerified) {
        setError("Please verify your email before logging in.");
        await signOut(auth); // Sign out the user
        return;
      }

      console.log("user.uid:", user.uid); // Use comma to log object properties
      setUseridd(user.uid); // Set user ID in the context
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify({ ...user, isTeacher }));
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Wrong Credentials"); // Set error message for wrong credentials
    }
  };

  return (
    <>
      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
            flex items-center justify-center font-serif text-blue-900"
      >
        <div className="bg-blue-100 w-full py-8 p-5 rounded-lg shadow-md">
          <h1 className="text-xl md:text-4xl font-bold leading-tight pb-8 text-center text-indigo-800">
            Log in
          </h1>

          <form
            className="mt-8 "
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name=""
                id=""
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                autoComplete="email"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name=""
                id=""
                placeholder="Enter Password"
                minLength="6"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                    focus:bg-white focus:outline-none"
                autoComplete="current-password"
              />
            </div>

            <div className="text-right mt-2">
              <Link
                to="/forgotpassword"
                className="text-sm font-semibold text-indigo-800 hover:text-blue-700 focus:text-blue-700"
              >
                Forgot Password?
              </Link>
            </div>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            
            <button
              type="submit"
              className="w-full block bg-indigo-800 hover:bg-indigo-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
            >
              Log In
            </button>
          </form>

          <hr className="mt-10 mb-8 border-blue-400 w-full" />

          <p className="mt-4 flex justify-center">
            Need an account?
            <Link
              to="/signup"
              className="text-indigo-800 hover:text-blue-900 ml-3 font-semibold"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
