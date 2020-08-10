// import React from 'react';

// export default class CompareRateList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       stats: {}
//     };
//   }

//   render() {
//     const setView = this.props.setView;
//     const statsObj = this.state.stats;
//     const crimeRateListItems = Object.keys(statsObj).map((item, i) => {
//       return (
//         <CrimeRateListItem
//           key={i}
//           setView={() => setView('crime-details', { type: item })}
//           image={statsObj[item].image}
//           crimeType={statsObj[item].crimeType}
//           rate={statsObj[item].rate} />
//       );
//     });
//     return (
//       <div className="container">
//         <h1 className="my-5 text-center quantico-font">Crime Comparison</h1>
//         <div className="mx-3">
//           {crimeRateListItems}
//         </div>
//       </div>
//     );
//   }
// }
