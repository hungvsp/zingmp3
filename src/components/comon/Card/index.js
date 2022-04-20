import './card.scss';
import Thumb from '../Thumb';
import { useSelector, useDispatch } from 'react-redux';
import {
  getDetailPlaylists,
  haddleIsPlay,
  selectData,
} from '../../../redux/slice';
function Card({ item }) {
  const dispatch = useDispatch();
  const state = useSelector(selectData);
  const { currentIdPlaylist, isPlay } = state;
  const isActive = currentIdPlaylist === item.encodeId;
  const handleClick = () => {
    if (!isActive) {
      dispatch(getDetailPlaylists(item.encodeId));
    } else {
      dispatch(haddleIsPlay(!isPlay));
    }
  };

  return (
    <div className="card-container" onClick={handleClick}>
      <div className="card-content-box">
        <Thumb
          src={item.thumbnail}
          isHoverPlay={true}
          isHoverMore={true}
          isHoverLike={true}
          isDarkBg={true}
          isActive={isActive}
        />

        <h3 className="title">
          <a href="/">{item.title}</a>
        </h3>
        <div className="sub-text">
          {item.title.includes('Top 100')
            ? item?.artists
                .map((artist) => artist.name)
                .join(',')
            : item.artistsNames || item?.sortDescription}
        </div>
      </div>
    </div>
  );
}
export default Card;
