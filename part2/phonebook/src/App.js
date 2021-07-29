import React, { useEffect, useState } from "react";

import Contacts from "./components/Contacts";
import SearchBar from "./components/SearchBar";
import NewContactForm from "./components/NewContactForm";
import Notification from "./components/Notification";

import contactService from "./services/contactService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setPersons(await contactService.getAll());
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  const onAddNewContact = (ev, newContact) => {
    ev.preventDefault();
    const index = persons.findIndex(
      (p) => p.name === newContact.name
    );
    if (index !== -1) {
      const id = persons[index].id;
      if (
        window.confirm(
          `${newContact.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        contactService
          .update(id, { ...newContact, id: id })
          .then((res) => {
            setPersons([
              ...persons.filter(
                (p) => p.name !== newContact.name
              ),
              res,
            ]);

            toastMessage({
              type: "notification",
              text: `Updated ${newContact.name}`,
            });
          })
          .catch((error) => catchFunc(error, id));
      }
    } else {
      contactService.create(newContact).then((res) => {
        setPersons([...persons, res]);
        toastMessage({
          type: "notification",
          text: `Added ${newContact.name}`,
        });
      });
    }
  };

  const onDelete = (id) => {
    const person = persons.find((n) => n.id === id);

    if (window.confirm(`Delete ${person.name}?`))
      contactService
        .remove(id)
        .then((_) => {
          setPersons(persons.filter((n) => n.id !== id));
          toastMessage({ type: "notification","text":`Deleted ${person.name}` });
        })
        .catch((error) => catchFunc(error, id));
  };

  const toastMessage = (newToast) => {
    setToast(newToast);
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const catchFunc = (error, id) => {
    toastMessage({
      type: "error",
      text: error.message,
    });
    setPersons(persons.filter((n) => n.id !== id));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={toast} />
      <SearchBar filter={filter} setFilter={setFilter} />

      <h3>Add a new</h3>
      <NewContactForm onAddNewContact={onAddNewContact} />

      <h3>Numbers</h3>
      <Contacts
        persons={persons}
        filter={filter}
        onDelete={onDelete}
      />
    </div>
  );
};

export default App;
