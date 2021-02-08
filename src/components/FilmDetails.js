import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { PlanetsList } from './PlanetsList';
import { StarshipsList } from './StarshipsList';

export const FilmDetails = ({ handleDetailsClose, episodeDetails }) => {
  const [starships, setStarships] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [showShips, setShowShips] = useState(false);
  const [showPlanets, setShowPlanets] = useState(false);

  const getStarships = () => {
    Promise.all(episodeDetails.starships.map(starship => (
      fetch(starship.replace('http', 'https'))
        .then(response => response.json())
        .then(obj => setStarships(prev => [...prev, obj])))));
  };

  const getPlanets = () => {
    Promise.all(episodeDetails.planets.map(planet => (
      fetch(planet.replace('http', 'https'))
        .then(response => response.json())
        .then(obj => setPlanets(prev => [...prev, obj])))));
  };

  const handleStarshipsList = () => {
    setShowShips(prev => !prev);
  };

  const handlePlanetsList = () => {
    setShowPlanets(prev => !prev);
  };

  useEffect(() => {
    setShowShips(false);
    setStarships([]);
    setPlanets([]);
    setShowPlanets(false);

    getStarships();
    getPlanets();
  }, [episodeDetails.episode_id]);

  return (
    <Card
      bg="secondary"
      text="white"
    >
      <Card.Body>
        <Card.Title className="text-right">
          <Button
            style={{ width: '50px' }}
            variant="dark"
            type="button"
            onClick={handleDetailsClose}
          >
            X
          </Button>
        </Card.Title>
        <Card.Text>
          Directed by
          {episodeDetails.director}
        </Card.Text>
        <Card.Text>
          Description:
          <br />
          {episodeDetails.opening_crawl}
        </Card.Text>
        <Card.Text>
          Release date:
          {` ${episodeDetails.release_date}`}
        </Card.Text>
        <Card.Text
          onClick={handleStarshipsList}
          style={{ cursor: 'pointer' }}
        >
          Starships
        </Card.Text>
        {showShips && (
          <StarshipsList starships={starships} />
        )}
        <Card.Text
          onClick={handlePlanetsList}
          style={{ cursor: 'pointer' }}
        >
          Planets
        </Card.Text>
        {showPlanets && (
          <PlanetsList planets={planets} />
        )}
      </Card.Body>
    </Card>
  );
};

FilmDetails.propTypes = {
  handleDetailsClose: PropTypes.func.isRequired,
  episodeDetails: PropTypes.object,
};

FilmDetails.defaultProps = {
  episodeDetails: {}
}