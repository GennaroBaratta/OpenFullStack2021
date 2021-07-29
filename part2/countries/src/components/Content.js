import { useEffect, useState } from "react";
import axios from "axios";
const api_key = process.env.REACT_APP_API_KEY;

const Content = ({ filteredData }) => {
  const [selected, setSelected] = useState(-1);

  useEffect(() => {
    setSelected(-1);
  }, [filteredData]);

  if (!filteredData) return <></>;

  if (filteredData.length === 1) {
    const state = filteredData[0];
    return <Detailed state={state} />;
  }

  if (selected !== -1) {
    return (
      <Detailed
        state={filteredData[selected]}
        setSelected={setSelected}
      ></Detailed>
    );
  }

  if (filteredData.length < 10) {
    return (
      <ul>
        {filteredData.map((state, index) => (
          <li
            className="clickable"
            key={state.alpha3Code}
            onClick={() => {
              setSelected(index);
            }}
          >
            {state.name}
          </li>
        ))}
      </ul>
    );
  } else {
    return <p>Too many matches, specify another filter</p>;
  }
};

const Detailed = ({ state, setSelected }) => {
  const [weather, setWeather] = useState();
  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${state.capital}&aqi=yes`
      )
      .then((res) => setWeather(res.data));
  }, [state.capital]);
  return (
    <>
      <h2>{state.name}</h2>
      <div>capital {state.capital}</div>
      <div>population {state.population}</div>

      <h4>Languages</h4>
      <ul>
        {state.languages.map((lang) => (
          <li key={lang.name}>
            {lang.name} ({lang.nativeName})
          </li>
        ))}
      </ul>
      <br></br>
      <img src={state.flag} alt="Nation's flag"></img>
      {!!weather && (
        <>
          <h4>Weather in {state.capital}</h4>
          <p>
            <b>temperature: </b>
            {weather["current"].temp_c} C°
          </p>
          <img
            src={weather.current.condition.icon}
            alt="Weather condition icon"
          ></img>
          <p>
            <b>wind: </b>
            {weather.current.wind_kph} kph direction {weather.current.wind_dir}
          </p>
        </>
      )}
      {!!setSelected && (
        <p
          className="clickable"
          onClick={() => {
            setSelected(-1);
          }}
        >
          {"<---"}
        </p>
      )}
    </>
  );
};
export default Content;
