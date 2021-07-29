const Contacts = ({ persons, filter, onDelete }) => {
  return (
    <>
      {!!persons &&
        persons
          .filter((p) =>
            p.name
              .toUpperCase()
              .includes(filter.toUpperCase())
          )
          .map((p) => (
            <Contact
              key={p.name}
              name={p.name}
              number={p.number}
              onClick={() => {
                onDelete(p.id);
              }}
            />
          ))}
    </>
  );
};

const Contact = ({ name, number, onClick }) => (
  <p>
    {name} {number}{" "}
    <button onClick={onClick}>Delete</button>
  </p>
);

export default Contacts;
