import React, { useEffect, useState, useMemo } from 'react';
import './home.scss';
import axios from 'axios';
import { URL_GET_HOME_FULL } from '../../constants/urlApi';
const SectionPlaylists = React.lazy(() =>
  import('../../components/SectionPlaylists')
);
const Slide = React.lazy(() =>
  import('../../components/Slide')
);

const Home = () => {
  const [dataHome, setDataHome] = useState({ data: [] });

  useEffect(() => {
    axios
      .get(URL_GET_HOME_FULL)
      .then((dataHomeFull) => {
        setDataHome(dataHomeFull);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const elementChildrentRender = useMemo(() => {
    return dataHome.data.map((item, index) => {
      if (item.sectionType === 'banner')
        return (
          <React.Suspense
            key={index}
            fallback={<div>Loading...</div>}
          >
            <Slide data={item} />
          </React.Suspense>
        );
      if (item.sectionType === 'playlist')
        return (
          <React.Suspense
            key={index}
            fallback={<div>Loading...</div>}
          >
            <SectionPlaylists data={item} />
          </React.Suspense>
        );
      return ''; // fix waning Array.prototype.map() expects a value to be returned at the end of arrow function
    });
  }, [dataHome]);
  return (
    <div className="home-container main-scroll has-player-padding-bottom">
      <div className="wapper-sub">
        {elementChildrentRender}
      </div>
    </div>
  );
};
export default Home;
