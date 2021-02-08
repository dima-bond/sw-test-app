import React from 'react';
import PropTypes from 'prop-types';

export const StarshipsList = ({ starships }) => (
  <ul>
    {starships.map(item => (
      <li key={item.created}>
        {item.name}
      </li>
    ))}
  </ul>
);

StarshipsList.propTypes = {
  starships: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};
