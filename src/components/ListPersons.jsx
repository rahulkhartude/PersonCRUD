import React from "react";

export const ListPersons = ({ myList,setMyList,hanleEdit }) => {
  console.log("myList", myList);

 
 const hanleDelete = (id)=>{
   const newList = myList.filter(x=>x.Id!==id);
   setMyList(newList);

 }
  return (
    <>
      <h2>Person Details</h2>

      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {myList.length === 0 && (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>No persons available</td>
            </tr>
          )}
          {myList.map((x, index) => (
            <tr key={x.Id}>
              <td>{index + 1}</td>
              <td>{x.First}</td>
              <td>{x.Last}</td>
              <td onClick={()=>hanleEdit(x.Id)}>Edit</td>
              <td onClick={()=>hanleDelete(x.Id)}>Delete</td>
              <td>Add Child</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
