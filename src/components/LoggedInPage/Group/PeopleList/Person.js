import React from "react";
import server from "../../../../api/server";
import store from "store";

const Person = ({ person, updateGroup }) => {
  const deletePerson = async personId => {
    const token = store.get("token");
    const authString = `Bearer ${token}`;
    try {
      const response = await server.delete("/manage/delete-person", {
        data: {
          personId,
          authString
        }
      });
      updateGroup(response.data.group);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <li className="person">
      <div className="person__name">{person.name}</div>
      <div className="person__number">{person.number}</div>
      <div className="close" onClick={() => deletePerson(person._id)}>
        <span aria-hidden="true" className="x">
          &times;
        </span>
      </div>
    </li>
  );
};

export default Person;
