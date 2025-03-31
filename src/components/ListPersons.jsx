
import React, { useState } from "react";

export const ListPersons = ({ myList, setMyList, hanleEdit }) => {
  const [childInputs, setChildInputs] = useState({});
  const [activeParent, setActiveParent] = useState(null); // Track which parent is adding a child

  // Handle input change
  const handleChildInputChange = (field, value) => {
    setChildInputs((prev) => ({ ...prev, [field]: value }));
  };

  // Handle Add Child button click (show input fields)
  const handleShowChildInput = (parentId) => {
    setActiveParent(parentId);
    setChildInputs({ firstName: "", lastName: "" }); // Reset input fields
  };

  // Save Child Function
  const handleSaveChild = (parentId) => {
    const { firstName = "", lastName = "" } = childInputs;
    if (!firstName || !lastName) return; // Prevent saving empty names

    setMyList((prevList) =>
      prevList.map((person) =>
        person.Id === parentId
          ? {
              ...person,
              children: [
                ...(person.children || []),
                {
                  Id: crypto.randomUUID(),
                  First: firstName,
                  Last: lastName,
                },
              ],
            }
          : person
      )
    );

    setActiveParent(null); // Hide input fields after saving
  };

  const handleDelete = (id) => {
    setMyList(myList.filter((x) => x.Id !== id));
  };

  return (
    <>
      <h2>Person Details</h2>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {myList.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>No persons available</td>
            </tr>
          )}
          {myList.map((x, index) => (
            <React.Fragment key={x.Id}>
              {/* Parent Row */}
              <tr>
                <td>{index + 1}</td>
                <td>{x.First}</td>
                <td>{x.Last}</td>
                <td>
                  <button onClick={() => hanleEdit(x.Id)}>Edit</button>
                  <button onClick={() => handleDelete(x.Id)}>Delete</button>
                  <button onClick={() => handleShowChildInput(x.Id)}>Add Child</button>
                </td>
              </tr>

              {/* Show Child Input Row ONLY for Active Parent */}
              {activeParent === x.Id && (
                <tr>
                  <td colSpan="4">
                    <input
                      type="text"
                      placeholder="Child First Name"
                      value={childInputs.firstName || ""}
                      onChange={(e) => handleChildInputChange("firstName", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Child Last Name"
                      value={childInputs.lastName || ""}
                      onChange={(e) => handleChildInputChange("lastName", e.target.value)}
                    />
                    <button onClick={() => handleSaveChild(x.Id)}>Save Child</button>
                  </td>
                </tr>
              )}

              {/* Child Rows */}
              {x.children && x.children.length > 0 && (
                <>
                  <tr>
                    <td colSpan="4"><strong></strong></td>
                  </tr>
                  {x.children.map((child, childIndex) => (
                    <tr key={child.Id}>
                      <td>{index + 1}.{childIndex + 1}</td>
                      <td>{child.First}</td>
                      <td>{child.Last}</td>
                      <td>Child</td>
                    </tr>
                  ))}
                </>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
};
