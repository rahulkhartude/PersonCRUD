
import React, { useState } from "react";

export const ListPersons = ({ myList, setMyList, hanleEdit }) => {
  const [activeParent, setActiveParent] = useState(null);
  const [editingChildId, setEditingChildId] = useState(null);
  const [childInputs, setChildInputs] = useState({});

  const handleShowChildInput = (parentId) => {
    setActiveParent(parentId);
    setEditingChildId(null); // Close editing if adding
    setChildInputs({ firstName: "", lastName: "" });
  };

  const handleDelete = (id) => {
    setMyList(myList.filter((item) => item.Id !== id));
  };

  const handleChildDelete = (childId) => {
    const deleteRecursively = (list) => {
      return list
        .map((person) => {
          if (person.children && person.children.length > 0) {
            return {
              ...person,
              children: deleteRecursively(
                person.children.filter((child) => child.Id !== childId)
              ),
            };
          }
          return person;
        })
        .filter((person) => person.Id !== childId);
    };

    setMyList(deleteRecursively(myList));
  };

  const handleChildInputChange = (field, value) => {
    setChildInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChild = (parentId) => {
    const { firstName = "", lastName = "" } = childInputs;
    if (!firstName || !lastName) return;

    const newChild = {
      Id: crypto.randomUUID(),
      First: firstName,
      Last: lastName,
      children: [],
    };

    const updateChildren = (list) =>
      list.map((person) => {
        if (person.Id === parentId) {
          return {
            ...person,
            children: [...person.children, newChild],
          };
        } else if (person.children && person.children.length > 0) {
          return {
            ...person,
            children: updateChildren(person.children),
          };
        }
        return person;
      });

    setMyList(updateChildren(myList));
    setActiveParent(null);
  };

  const handleChildEdit = (child) => {
    setEditingChildId(child.Id);
    setActiveParent(null); // Close adding
    setChildInputs({ firstName: child.First, lastName: child.Last });
  };

  const handleSaveEditedChild = (childId) => {
    const updateChildData = (list) =>
      list.map((person) => {
        if (person.Id === childId) {
          return {
            ...person,
            First: childInputs.firstName,
            Last: childInputs.lastName,
          };
        } else if (person.children && person.children.length > 0) {
          return {
            ...person,
            children: updateChildData(person.children),
          };
        }
        return person;
      });

    setMyList(updateChildData(myList));
    setEditingChildId(null);
  };

  const renderChildren = (childrenList, parentIndex) => {
    return childrenList.map((child, childIndex) => {
      const serialNumber = `${parentIndex}.${childIndex + 1}`;
      return (
        <React.Fragment key={child.Id}>
          {editingChildId === child.Id ? (
            <tr>
              <td>{serialNumber}</td>
              <td>
                <input
                  type="text"
                  value={childInputs.firstName || ""}
                  onChange={(e) => handleChildInputChange("firstName", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={childInputs.lastName || ""}
                  onChange={(e) => handleChildInputChange("lastName", e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleSaveEditedChild(child.Id)}>Save</button>
                <button onClick={() => setEditingChildId(null)}>Cancel</button>
              </td>
            </tr>
          ) : (
            <tr>
              <td>{serialNumber}</td>
              <td>{child.First}</td>
              <td>{child.Last}</td>
              <td>
                <button onClick={() => handleChildEdit(child)}>Edit</button>
                <button onClick={() => handleChildDelete(child.Id)}>Delete</button>
                <button onClick={() => handleShowChildInput(child.Id)}>Add Child</button>
              </td>
            </tr>
          )}

          {/* {activeParent === child.Id && (
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
          )} */}

          {child.children.length > 0 &&
            renderChildren(child.children, serialNumber)}
        </React.Fragment>
      );
    });
  };


  //person data
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
            const serialNumber = index + 1;
            return (
              <React.Fragment key={x.Id}>
                <tr>
                  <td>{serialNumber}</td>
                  <td>{x.First}</td>
                  <td>{x.Last}</td>
                  <td>
                    <button onClick={() => hanleEdit(x.Id)}>Edit</button>
                    <button onClick={() => handleDelete(x.Id)}>Delete</button>
                    <button onClick={() => handleShowChildInput(x.Id)}>Add Child</button>
                  </td>
                </tr>

                {activeParent === x.Id && (
                  <tr>
                    <td colSpan="4">
                      <input
                        type="text"
                        placeholder="Child First Name"
                        value={childInputs.firstName || ""}
                        onChange={(e) =>
                          handleChildInputChange("firstName", e.target.value)
                        }
                      />
                      <input
                        type="text"
                        placeholder="Child Last Name"
                        value={childInputs.lastName || ""}
                        onChange={(e) =>
                          handleChildInputChange("lastName", e.target.value)
                        }
                      />
                      <button onClick={() => handleSaveChild(x.Id)}>Save Child</button>
                    </td>
                  </tr>
                )}

                {x.children.length > 0 && renderChildren(x.children, serialNumber)}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
