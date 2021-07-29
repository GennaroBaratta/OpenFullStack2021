import { useState } from "react";

const NewContactForm = ({ onAddNewContact }) => {
  const [newContact, setNewContact] = useState({
    name: "",
    number: "",
  });

  return (
    <form>
      <div>
        name:{" "}
        <input
          value={newContact.name}
          onChange={(ev) =>
            setNewContact({
              ...newContact,
              name: ev.target.value,
            })
          }
        />
      </div>
      <div>
        number:{" "}
        <input
          value={newContact.number}
          onChange={(ev) =>
            setNewContact({
              ...newContact,
              number: ev.target.value,
            })
          }
        />
      </div>
      <div>
        <button
          type="submit"
          onClick={(ev) => onAddNewContact(ev, newContact)}
        >
          add
        </button>
      </div>
    </form>
  );
};

export default NewContactForm;
