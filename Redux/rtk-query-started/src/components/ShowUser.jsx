import React from 'react'
import { useGetStudentsQuery } from '../redux/features/studentApi'

function ShowUser() {
    const {data, isSuccess, isLoading, isError, error} = useGetStudentsQuery();
    console.log(data);

    if(isLoading){return <h1>Loading.........</h1>}
    if(isError){return <p>Eror</p>}
    // if(isError){return <p>{error}</p>}
  return (
    <div>
        <h1>Student Data</h1>
        <div>
            {isSuccess && data?.map((studentData) =>{return(
                <div className='m-5' key={studentData.id}>
                <h1>{studentData.studentName}</h1>
                <h2>{studentData.studentEmail}</h2>
                </div>
            )})}
        </div>
    </div>
  )
}

export default ShowUser