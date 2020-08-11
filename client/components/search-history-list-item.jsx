import React from 'react';

export default function SearchHistoryListItem(props) {
  return (
    <li className="h5 mb-3">
      <h5 className="font-weight-bold">{props.location}</h5>
      <h6>Searched on {props.date} at {props.time}</h6>
    </li>
  );
}
