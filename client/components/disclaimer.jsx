import React from 'react';
import useLockBodyScroll from './lock-body-scroll';

export default function Disclaimer(props) {
  useLockBodyScroll();
  return (
    <section className="modal-overlay modal-shade d-flex">
      <div className="disclaimer-content text-white p-3">
        <p>Due to limitations, only a small sample of crime data for Boston, Chicago, Detroit, Los Angeles, and San Francisco is currently available.</p>
        <p>For now, please limit your searches to these five cities only.</p>
        <p>Thanks!</p>
        <button onClick={props.closeDisclaimer} className="btn btn-color">
          Proceed
        </button>
      </div>
    </section>
  );
}
