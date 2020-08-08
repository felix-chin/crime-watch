import React from 'react';

export default function CrimeDetailsListItem(props) {
  return (
    <ul onClick={props.setView} className="list-type-none p-0 roboto-font">
      <li>{props.date} @ {props.address}</li>
      <li>{props.detail}</li>
    </ul>
  );
}
