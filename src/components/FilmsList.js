import React from 'react';
import PropTypes from 'prop-types';
import { Col, Card } from 'react-bootstrap';

export const FilmsList = ({ handleClickDetails, visibleFilms }) => (
  <Col>
    {visibleFilms.map(film => (
      <Card
        style={{
          marginBottom: '20px', cursor: 'pointer',
        }}
        key={film.episode_id}
        onClick={() => {
          handleClickDetails(film.episode_id);
        }}
      >
        <Card.Body>
          <Card.Title>{film.title}</Card.Title>
          <Card.Text>{film.opening_crawl}</Card.Text>
        </Card.Body>
      </Card>
    ))}
  </Col>
);

FilmsList.propTypes = {
  handleClickDetails: PropTypes.func.isRequired,
  visibleFilms: PropTypes.arrayOf(PropTypes.object).isRequired,
};
