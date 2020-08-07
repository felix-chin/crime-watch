import React from 'react';

export default function CrimeDetailsListItem(props) {
  return (
    <div onClick={props.onClick}>
      <p>{props.date} @ {props.address}</p>
      <p>{props.detail}</p>
    </div>
  );
}
