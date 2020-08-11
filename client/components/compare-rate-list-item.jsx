import React from 'react';

export default function CompareRateListItem(props) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mb-1">
      <h5 className="d-flex flex-row justify-content-start roboto-font font-size-compare">{props.crimeType}</h5>
      <div className="container d-flex flex-row justify-content-start">
        <img src={props.image} className="mr-4 images-compare col-" />
        <div className="d-flex flex-row justify-content-between align-items-center col-9">
          <h5 className="roboto-font font-size-compare">{props.rate1}</h5>
          <h5 className="roboto-font pr-4 font-size-compare">{props.rate2}</h5>
        </div>
      </div>
    </div>
  );
}
