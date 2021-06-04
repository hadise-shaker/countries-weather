import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header";
import ThemeContext from "./Context/Theme";
import Main from "./Components/Main";
const App = (props) => {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://restcountries.eu/rest/v2");
      const response2 = await response.json();
      setCountries(response2);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFiltered(
      countries.filter((country) =>
        country.name.toUpperCase().includes(search.toUpperCase())
      )
    );
  }, [countries, search]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSelectCountry = async (country) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=45d402f1a03e7167524f0bfa149f696c`
    );

    const weather = await response.json();
    console.log(weather);

    setDetails(
      <Container>
        <Row className="justify-content-md-start align-items-start">
          <Col>
            <h2>{country.name}</h2>
            <p>Capital City: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h4>Languages</h4>
            <ul>
              {country.languages.map((language) => (
                <li key={language.name}>{language.name}</li>
              ))}
            </ul>
            <h4>Weather in {country.capital}</h4>
            <p>temperature: {Math.floor(weather.main.temp - 273)} Celcius</p>
          </Col>
          <Col>
            <img
              src={country.flag}
              height="auto"
              width="320px"
              alt="country flag"
              className="shadow rounded"
            />
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <div>
      <Main></Main>
      <ThemeContext.Consumer>
        {(value) => (
          <div>
            {/*  <h2>{value}</h2> */}
            <Container
            /*  style={{ backgroundColor: value.color }} */
            /* className="bg-light" */
            >
              <h1 className="text-center text-primary p-5">Country Browser</h1>
              <Row>
                <Col md="3" className="py-2">
                  <Form className="pb-3">
                    <Form.Label>Find A Country</Form.Label>
                    <Form.Control
                      value={search}
                      type="text"
                      placeholder="Filter Countries..."
                      onChange={handleSearch}
                    />
                  </Form>
                  <ListGroup>
                    {filtered.map((country) => (
                      <ListGroupItem
                        action
                        key={country.name}
                        onClick={() => handleSelectCountry(country)}
                      >
                        {country.name}
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </Col>
                <Col md="9" className="py-2">
                  {details}
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </ThemeContext.Consumer>
    </div>
  );
};

export default App;
