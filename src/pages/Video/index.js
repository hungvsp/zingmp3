import './video.scss';
import axios from 'axios';
import { URL_GET_BOTTOM_VIDEOS } from '../../constants/urlApi';
import ItemVideo from '../../components/comon/ItemVideo';
import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { haddleIsPlay } from '../../redux/slice';
import { useSelector, useDispatch } from 'react-redux';
import PlayerVideo from '../../components/comon/PlayerVideo';
import { getData, selectVideo } from '../../redux/video';
import ThumbVideo from '../../components/comon/ThumbVideo';
import { useNavigate } from 'react-router-dom';
function Video() {
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const id = params.get('id');
  const [dataBottom, setDataBottom] = useState([]);
  const stateVideo = useSelector(selectVideo);
  const { recommends, videoCurrent } = stateVideo;
  const containerRef = useRef();
  const navigate = useNavigate();
  // off play song
  useEffect(() => {
    dispatch(haddleIsPlay(false));
  }, []);
  const hanldeClickClose = () => {
    navigate('/');
  };
  useEffect(() => {
    if (id) {
      axios.get(URL_GET_BOTTOM_VIDEOS + id).then((data) => {
        if (data.status === 200) {
          if (data.data.err === 0) {
            setDataBottom(data.data.data);
          }
        }
      });
      dispatch(getData(id));

      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [id]);
  return (
    <div className="video-conatainer" ref={containerRef}>
      <div className="play-video-box">
        <div className="header">
          <div className="right-left">
            <div className="avarta">
              <img
                src={
                  videoCurrent?.artists &&
                  videoCurrent?.artists[0]?.thumbnail
                }
                alt=""
              />
            </div>
            <div className="info">
              <div className="title">
                {videoCurrent?.title}
              </div>
              <div className="artists">
                {videoCurrent?.artistsNames}
              </div>
            </div>
          </div>
          <div className="right-box">
            <button
              className="btn-reset is-hover-circle btn-close-video"
              onClick={hanldeClickClose}
            >
              <span className="ic-close"></span>
            </button>
          </div>
        </div>
        <div className="play-video">
          <PlayerVideo />
          <div className="recommend-container">
            <div className="title-header">
              <h3>Danh sach phat</h3>
            </div>
            <ul className="recommend-box">
              {recommends.map((item, index) => {
                return (
                  <li
                    className="recommend-item"
                    key={index}
                  >
                    <div className="recommend-thumb-video">
                      <ThumbVideo item={item} />
                    </div>
                    <div className="info-video">
                      <h3 className="title fz-14">
                        {item.title}
                      </h3>
                      <p className="artists fz-12">
                        {item.artistsNames}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="video-bottom-container wapper-video">
        {dataBottom.map((items, index) => {
          return (
            <div className="video-bottom">
              <h3 className="fz-20 my-10">{items.title}</h3>
              <div className="video-bottom-box">
                {items.items.map((item, index) => {
                  return (
                    <div className="video-bottom-item">
                      <ItemVideo item={item} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Video;
