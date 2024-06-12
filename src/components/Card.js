import React from 'react';

const Card = ({ image, value, suit }) => {
  return (
    <div className="card">
      <img src={image} alt={`${value} of ${suit}`} />
    </div>
  );
};

export default Card;
