import React from 'react';

export default function CrimeDetailsListItem(props) {
  return (
    <ul onClick={props.setView} className="list-type-none p-0 roboto-font pointer">
      <li className="font-weight-bold">{props.detail}</li>
      <li>{props.date} @ {props.address}</li>
    </ul>
  );
}
