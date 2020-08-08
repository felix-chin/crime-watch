import React from 'react';

export default function CrimeRateListItem(props) {
  return (
    <div onClick={props.setView} className="d-flex justify-content-start align-items-center mb-4">
      <img src={props.image} className="col- images" />
      <h4 className="col-8 roboto-font">{props.crimeType}</h4>
      <h4 className="col- roboto-font">{props.rate}</h4>
    </div>
  );
}
