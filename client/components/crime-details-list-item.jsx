import React from 'react';

export default function CrimeDetailsListItem(props) {
  return (
    <div onClick={props.setView}>
      <p>{props.date} @ {props.address}</p>
      <p>{props.detail}</p>
    </div>
  );
}
