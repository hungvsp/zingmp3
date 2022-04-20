import './search.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { URL_SEARCH } from '../../constants/urlApi';
import Itemlist from '../../components/comon/ItemList';
import ItemVideo from '../../components/comon/ItemVideo';
import Card from '../../components/comon/Card';
import { useDispatch } from 'react-redux';
import { getDetailPlaylistsByIdSong } from '../../redux/slice';
import { hanldeChangeIsCollapse } from '../../redux/search';
function Search() {
  const [dataSearchs, setDataSearchs] = useState({});
  const [keySeachs] = useSearchParams();
  const keySeach = keySeachs.get('key');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(hanldeChangeIsCollapse(false));
    axios.get(URL_SEARCH + keySeach).then((data) => {
      if (data.status === 200) {
        if (data.data?.data?.data) {
          setDataSearchs(data.data?.data?.data);
        }
      }
    });
  }, [keySeach, dispatch]);

  return (
    <div className="search-conatainer has-player-padding-bottom">
      <div className="head-title">
        <div className="wapper-sub">
          <h2>
            Kết Quả Tìm Kiếm : <i>{keySeach}</i>
          </h2>
        </div>
      </div>
      {dataSearchs.songs && (
        <div className="song-search">
          <div className="wapper-sub">
            <h3 className="name">Bai hat</h3>
            <div>
              {dataSearchs.songs.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      dispatch(
                        getDetailPlaylistsByIdSong(
                          item.encodeId
                        )
                      );
                    }}
                  >
                    <Itemlist index={index} item={item} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {dataSearchs.playlists && (
        <div className="playlist-search">
          <div className="wapper-sub">
            <h3 className="name">Playlist</h3>
            <div className="playlist-search-box">
              {dataSearchs.playlists.map((item, index) => {
                return (
                  <div
                    className="playlist-search-item"
                    key={index}
                  >
                    <Card item={item} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {dataSearchs.videos && (
        <div className="video-search">
          <div className="wapper-sub">
            <h3 className="name">Video</h3>
            <div className="video-search-box">
              {dataSearchs.videos.map((item, index) => {
                return (
                  <div
                    className="video-search-item"
                    key={index}
                  >
                    <ItemVideo item={item} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Search;
