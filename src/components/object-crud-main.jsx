

import React, { useState } from "react";
import { ListPersons } from "./ListPersons";

export const Object_crud_main = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [myList, setMyList] = useState([]);
  const [editId, setEditId] = useState(null);

  // Function to save or update a person
  const handleSave = () => {
    if (!firstName || !lastName) return;

    const id = crypto.randomUUID();
    const isExist = myList.some(
      (person) => person.First === firstName && person.Last === lastName
    );

    if (!isExist) {
      if (editId) {
        setMyList((prevList) =>
          prevList.map((person) =>
            person.Id === editId
              ? { ...person, First: firstName, Last: lastName }
              : person
          )
        );
      } else {
        setMyList([...myList, { Id: id, First: firstName, Last: lastName, children: [] }]);
      }
      setFirstName("");
      setLastName("");
      setEditId(null);
    }
  };

  // Function to handle editing a person
  const hanleEdit = (id) => {
    setEditId(id);
    let editObj = myList.find((x) => x.Id === id);
    setFirstName(editObj.First);
    setLastName(editObj.Last);
  };

  return (
    <>
      <h3>Main</h3>
      <input
        type="text"
        placeholder="Enter First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />{" "}
      <br />
      <input
        type="text"
        placeholder="Enter Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />{" "}
      <br />
      <button onClick={handleSave}>{editId ? "Update" : "Save"}</button> <br />
      {myList.length > 0 && <ListPersons myList={myList} setMyList={setMyList} hanleEdit={hanleEdit}  />}
    </>
  );
};
