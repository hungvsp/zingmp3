import React from 'react';
import Slide from '../../components/Slide';
const Home = (props) => {
  const { src } = props;
  return (
    <div className="home-container">
      <div className="wapper-sub">
        <Slide />
      </div>
    </div>
  );
};
export default Home;
