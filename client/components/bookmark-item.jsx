import React from 'react';

export default function BookmarkItem(props) {
  return (
    <div className='row mb-2 align-items-center'>
      <div className='col-2'>
        <img className='images' src='../images/bookmark_blue.png'></img>
      </div>
      <div className='col-10' style={{ fontSize: '16px' }}>
        <p className="roboto-font mb-0"><b>Date:</b> {props.date}</p>
        <p className="roboto-font mb-0"><b>Address:</b> {props.address}</p>
        <p className="roboto-font mb-0"><b>Details:</b> {props.details}</p>
      </div>
    </div>
  );
}
