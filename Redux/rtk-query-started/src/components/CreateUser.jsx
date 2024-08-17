import React, { useRef, useContext, useState } from 'react';
import {useAddStudentMutation} from "../redux/features/studentApi"

export default function CreateUser() {
  const username = useRef();
  const email = useRef();
  const [addStudent] = useAddStudentMutation();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const student = {studentName : username.current.value,studentEmail : email.current.value };
    addStudent(student);
    console.log(username.current.value,email.current.value)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-900 via-teal-700 to-teal-900">
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-8 bg-gradient-to-b from-gray-800 to-gray-600 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label htmlFor="text" className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2">
              UserName
            </label>
            <input
              ref={username}
              id="text"
              type="text"
              name="name"
              className="appearance-none block w-full bg-gray-700 text-gray-300 border border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600"
            />
          </div>

          <div className="w-full px-3">
            <label htmlFor="password" className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2">
              Email
            </label>
            <input
              ref={email}
              id="text"
              type="text"
              name="mail"
              className="appearance-none block w-full bg-gray-700 text-gray-300 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button className="px-4 py-2 bg-teal-800 text-white rounded hover:bg-teal-700">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
