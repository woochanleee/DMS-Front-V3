import React from 'react';

import './PointCard.scss';

const PointCard = ({ pointType, reason, date, point }) => {
  return (
    <div className={`point--card--wrapper ${pointType}`}>
      <div className="point--card--left--wrapper">
        <span className="point--card--left--reason">{reason}</span>
        <span className="point--card--left--date">{date}</span>
      </div>
      <span className="point--card--point">{`+${point}`}</span>
    </div>
  );
};

export default PointCard;
