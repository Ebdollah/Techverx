import React, { useRef, useContext, useState, useEffect } from 'react';
import {useAddStudentMutation, useGetStudentByIdQuery, useEditStudentMutation} from "../redux/features/studentApi"
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


export default function CreateUser() {
  const username = useRef();
  const email = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  const [addStudent] = useAddStudentMutation();
  const [editStudent] = useEditStudentMutation();

  // const {refetch} = useGetStudentsQuery();
  console.log(id);
  
  // const { data: student } = useGetStudentByIdQuery(id, { skip: !id }); // Fetch only if `id` is present

  // useEffect(() => {
  //   if (student) {
  //     // If editing, pre-fill the form with the student's data
  //     username.current.value = student.studentName;
  //     email.current.value = student.studentEmail;
  //   }
  // }, [student]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentData = {
      studentName: username.current.value,
      studentEmail: email.current.value,
    };

    if (id) {
      // If an id is present, update the user
      await editStudent({ id, ...studentData });
    } else {
      // Otherwise, create a new user
      await addStudent(studentData);
    }

    navigate('/');
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
            {id ? 'Update User' : 'Create User'}
          </button>
        </div>
      </form>
    </div>
  );
}
