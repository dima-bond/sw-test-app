import React from 'react';
import PropTypes from 'prop-types';

export const PlanetsList = ({ planets }) => (
  <ul>
    {planets.map(item => (
      <li key={item.created}>
        {item.name}
      </li>
    ))}
  </ul>
);

PlanetsList.propTypes = {
  planets: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};
