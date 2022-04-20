import { useCallback } from 'react';
import ThumbSong from '../ThumbSong';
import {
  haddleIsPlay,
  ChangeCurrentIdSong,
  selectData,
} from '../../../redux/slice';
import { haddleIsShowModal } from '../../../redux/modal';
import { useSelector, useDispatch } from 'react-redux';
function ShowItemSong({ item, index }) {
  const dispatch = useDispatch();
  const state = useSelector(selectData);
  const { isPlay, currentIdSong } = state;
  const isActive =
    currentIdSong === item.encodeId ||
    currentIdSong === item.id;

  const onClickThumbSong = useCallback(() => {
    if (isActive) {
      dispatch(haddleIsPlay(!isPlay));
    } else {
      dispatch(
        ChangeCurrentIdSong(item.encodeId || item.id)
      );

      dispatch(haddleIsPlay(true));
    }
  }, [item, isActive, isPlay, dispatch]);

  const onClickThumbSongVip = useCallback(() => {
    dispatch(haddleIsShowModal(true));
  }, []);
  const isVip =
    item.streamingStatus === 2 || item.playStatus === 3;
  return (
    <div className="thumb-song-box">
      <div className=" is_40x40 thumb-img">
        <ThumbSong
          onClick={
            isVip ? onClickThumbSongVip : onClickThumbSong
          }
          src={item.thumbnail || item.thumb}
          className={isActive ? 'active' : ''}
        />
      </div>
      <div className="thumb-content">
        <div className="song-title">
          <span>{item.title}</span>
          {isVip && (
            <span className="icon ic-svg-vip-label ml-10"></span>
          )}
        </div>
        <div className="sub-text">
          {item.artistsNames ||
            item.artists
              .map((artist) => artist.name)
              .join(',')}
        </div>
      </div>
    </div>
  );
}

export default ShowItemSong;
