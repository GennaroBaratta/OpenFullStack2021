import { useEffect, useState } from "react";
import axios from "axios";
import Content from "./components/Content";

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  const filteredData =
    !!data &&
    data.filter((obj) => obj.name.toUpperCase().includes(search.toUpperCase()));

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div>
      find countries{" "}
      <input value={search} onChange={(e) => setSearch(e.target.value)}></input>
      <Content filteredData={filteredData} />
    </div>
  );
}

export default App;
