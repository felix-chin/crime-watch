import React from 'react';

export default function CrimeDetailsHeading(props) {
  return (
    <div className="d-flex justify-content-center mb-3">
      <img src={props.image} className="images mr-2" />
      <h2>{props.heading}</h2>
    </div>
  );
}
