import React from "react";
import { useGetStudentsQuery, useDeleteStudentMutation } from "../redux/features/studentApi";
import { FaEdit, FaTrash } from "react-icons/fa"; // FaEdit for edit and FaTrash for delete icon
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



function ShowUser() {
  const { data, isSuccess, isLoading, isError, error } = useGetStudentsQuery();
  console.log(data);
  const [deleteStudent] = useDeleteStudentMutation();
  const navigate = useNavigate();


  if (isLoading) {
    return <h1>Loading.........</h1>;
  }
  if (isError) {
    return <p>Eror</p>;
  }
  // if(isError){return <p>{error}</p>}
  return (
    <div>
      <h1>Student Data</h1>
      <div className="grid grid-cols-4 gap-4">
        {isSuccess &&
          data?.map((studentData) => {
            return (
              <div className="flex m-3" key={studentData.id}>
                <div className="mr-4">
                  <h1>{studentData.studentName}</h1>
                  <h2>{studentData.studentEmail}</h2>
                </div>
                <div className="flex flex-col p-1">
                  <button
                    onClick={()=>navigate(`edit/${studentData?.id}`)}
                    className="text-blue-500 hover:text-blue-700 p-1"
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    onClick={()=>deleteStudent(studentData?.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ShowUser;
