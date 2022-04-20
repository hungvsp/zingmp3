import './thumbVideo.scss';
import { Link } from 'react-router-dom';
import { VIDEO } from '../../../constants/slug';
import { selectVideo } from '../../../redux/video';
import { useSelector, useDispatch } from 'react-redux';
import { haddleIsShowModal } from '../../../redux/modal';
function ThumbVideo({ item }) {
  const stateVideo = useSelector(selectVideo);
  const { idCurrent } = stateVideo;
  const isActive = idCurrent && idCurrent === item.encodeId;
  const isVip = item.streamingStatus === 2;
  const dispatch = useDispatch();
  return (
    <div className={`thumb-video-container`}>
      <img src={item.thumbnail} alt={item.title} />
      {isVip && (
        <span className="icon-vip ic-svg-vip-label"></span>
      )}
      <p className="status-play"></p>
      {isActive && <p className="status-play">Đang phát</p>}
      {isVip ? (
        <div
          className="link-video"
          onClick={() => {
            dispatch(haddleIsShowModal(true));
          }}
        ></div>
      ) : (
        <Link
          to={VIDEO + '?id=' + item.encodeId}
          className="link-video"
        ></Link>
      )}
    </div>
  );
}
export default ThumbVideo;
