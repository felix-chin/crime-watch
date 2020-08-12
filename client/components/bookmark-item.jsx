import React from 'react';

export default function BookmarkItem(props) {
  return (
    <>
      <div className='col-2'>
        <img className='images' src='../images/bookmark_blue.png'></img>
      </div>
      <div className='col-10' style={{ fontSize: '22px' }}>
        <p><b>Date:</b> {props.date}</p>
        <p><b>Address:</b> {props.address}</p>
        <p><b>Details:</b> {props.details}</p>
      </div>
      <hr className='horizontal-row'></hr>
    </>
  );
}
