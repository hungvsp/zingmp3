import SectionPlaylists from '../../components/SectionPlaylists';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { selectData } from '../../redux/slice';
import { useSelector } from 'react-redux';
import { URL_GET_BOTTOM_PLAYLISTS } from '../../constants/urlApi';
function SectionBottom() {
  const state = useSelector(selectData);
  const { currentIdPlaylist } = state;
  const [dataBottom, setDataBottom] = useState([]);

  useEffect(() => {
    axios
      .get(URL_GET_BOTTOM_PLAYLISTS + currentIdPlaylist)
      .then((dataBottom) => {
        if (
          dataBottom.statusText === 'OK' &&
          dataBottom.data.data.err === 0
        ) {
          const resultBottoms = dataBottom.data.data.data;
          setDataBottom(resultBottoms);
        }
      });
  }, [currentIdPlaylist]);
  return (
    dataBottom.length &&
    dataBottom.map((item, index) => {
      if (item.sectionType === 'playlist') {
        return <SectionPlaylists data={item} key={index} />;
      }
      return ''; // fix not
    })
  );
}
export default SectionBottom;
