import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { getAllFilms } from './api';
import { FilmDetails } from './components/FilmDetails';
import { FilmsList } from './components/FilmsList';

const App = () => {
  const [filmsList, setFilmsList] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  const [visibleFilms, setVisibleFilms] = useState([]);
  const [reverseOrder, setReverseORder] = useState(false);
  const [episodeDetails, setEpisodeDetails] = useState(null);

  useEffect(() => {
    getAllFilms()
      .then((filmsFromServer) => {
        setFilmsList(filmsFromServer.results);
        setVisibleFilms(filmsFromServer.results);
      });
  }, []);

  useEffect(() => {
    const result = filmsList.filter(film => (
      film.title.toLowerCase().includes(inputQuery.toLocaleLowerCase())));

    setVisibleFilms(result);
  }, [inputQuery]);

  const handleInput = (event) => {
    setInputQuery(event.target.value);
  };

  const handleSort = () => {
    setVisibleFilms(
      [...visibleFilms].sort((a, b) => (reverseOrder
        ? b.title.localeCompare(a.title)
        : a.title.localeCompare(b.title))),
    );
    setReverseORder(prev => !prev);
  };

  const handleClickDetails = (filmId) => {
    const chosenFilm = filmsList.find(film => film.episode_id === filmId);

    setEpisodeDetails(chosenFilm);
  };

  const handleDetailsClose = () => {
    setEpisodeDetails(null);
  };

  return (
    <Container fluid>
      <Nav
        expand="lg"
        style={{ margin: '15px 0' }}
      >
        <input
          type="text"
          placeholder="Search a film"
          value={inputQuery}
          onChange={handleInput}
        />
        <Button
          style={{ margin: '0 15px' }}
          variant="secondary"
          type="button"
          onClick={handleSort}
        >
          {reverseOrder ? 'sort Z - A' : 'sort A - Z'}
        </Button>
      </Nav>
      <Row>
        <FilmsList
          handleClickDetails={handleClickDetails}
          visibleFilms={visibleFilms}
        />
        <Col>
          {episodeDetails && (
            <FilmDetails
              handleDetailsClose={handleDetailsClose}
              episodeDetails={episodeDetails}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
