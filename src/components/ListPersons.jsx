
import React, { useState } from "react";

export const ListPersons = ({ myList, setMyList, hanleEdit }) => {
  const [activeParent, setActiveParent] = useState(null); // Track where input should show
  const [childInputs, setChildInputs] = useState({}); // Store input values

  // Handle showing input for a specific parent/child
  const handleShowChildInput = (parentId) => {
    setActiveParent(parentId);
    setChildInputs({ firstName: "", lastName: "" }); // Reset input fields
  };

  // Handle input changes
  const handleChildInputChange = (field, value) => {
    setChildInputs((prev) => ({ ...prev, [field]: value }));
  };

  // Save Child Function
  const handleSaveChild = (parentId) => {
    const { firstName = "", lastName = "" } = childInputs;
    if (!firstName || !lastName) return; // Prevent empty save

    const newChild = {
      Id: crypto.randomUUID(),
      First: firstName,
      Last: lastName,
      children: [] // Allow infinite nesting
    };

    // Function to update children recursively
    const updateChildren = (list) => {
      return list.map((person) => {
        if (person.Id === parentId) {
          return { ...person, children: [...person.children, newChild] };
        } else if (person.children.length > 0) {
          return { ...person, children: updateChildren(person.children) };
        }
        return person;
      });
    };

    setMyList(updateChildren(myList)); // Update list
    setActiveParent(null); // Hide input fields after saving
  };

  // Render Nested Children Recursively with Proper Serial Numbers
  const renderChildren = (childrenList, parentIndex) => {
    return childrenList.map((child, childIndex) => {
      const serialNumber = `${parentIndex}.${childIndex + 1}`;
      return (
        <React.Fragment key={child.Id}>
          <tr>
            <td>{serialNumber}</td>
            <td>{child.First}</td>
            <td>{child.Last}</td>
            <td>
              <button onClick={() => handleShowChildInput(child.Id)}>Add Child</button>
            </td>
          </tr>

          {/* Show input fields only for the active parent */}
          {activeParent === child.Id && (
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
                <button onClick={() => handleSaveChild(child.Id)}>Save Child</button>
              </td>
            </tr>
          )}

          {/* Recursively render children */}
          {child.children.length > 0 && renderChildren(child.children, serialNumber)}
        </React.Fragment>
      );
    });
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
          {myList.map((x, index) => {
            const serialNumber = index + 1; // Parent serial number
            return (
              <React.Fragment key={x.Id}>
                <tr>
                  <td>{serialNumber}</td>
                  <td>{x.First}</td>
                  <td>{x.Last}</td>
                  <td>
                    <button onClick={() => hanleEdit(x.Id)}>Edit</button>
                    <button onClick={() => handleShowChildInput(x.Id)}>Add Child</button>
                  </td>
                </tr>

                {/* Show input fields only for the active parent */}
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

                {/* Render Nested Children */}
                {x.children.length > 0 && renderChildren(x.children, serialNumber)}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
