import React from "react";

export default function L2() {
  const Users = [
    {
      name: "Ahmad",
      age: "18",
    },
    {
      name: "Ali",
      age: "28",
    },
    {
      name: "Bilal",
      age: "10",
    },
    {
      name: "Usjid",
      age: "22",
    },
  ];
  return (
    <div>
      {Users.map((user) => {
        console.log(user);
        return (
          <div key={user.name}>
          <UserProfile name={user.name} age={user.age} />
            {/* <p>Name: {user.name}</p>
            <p>Age: {user.age}</p> */}
          </div>
        );
      })}
    </div>
  );
  // return(
  //     <table>
  //         <tr>
  //             <th>
  //                 Name
  //             </th>
  //             <th>
  //                 Age
  //             </th>
  //         </tr>
  //         <tr>
  //             <td>

  //             </td>
  //         </tr>
  //     </table>
  //    )
}

const UserProfile = ({name,age}) => {
  // const users = [
  //     {
  //         name: 'Ahmad',
  //         age: '18'
  //     },
  //     {
  //         name: 'Ali',
  //         age: '28'
  //     },
  //     {
  //         name: 'Bilal',
  //         age: '10'
  //     },
  //     {
  //         name: 'Usjid',
  //         age: '22'
  //     },
  // ];
  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Age</th>
      </tr>
      <tr>
        <td>{name}</td>
        <td>{age}</td>
      </tr>
    </table>
  );

  // return (
  //     <div>
  //         {users.map(user => {
  //             console.log(user);
  //             return (
  //                 <div key={user.name}>
  //                     <p>Name: {user.name}</p>
  //                     <p>Age: {user.age}</p>
  //                 </div>
  //             );
  //         })}
  //     </div>
  // );
};
