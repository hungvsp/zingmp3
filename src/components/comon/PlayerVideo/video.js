import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  hanldeChangeIsPlay,
  selectVideo,
} from '../../../redux/video';
function Video({ onChangeTime, timeSeek, isSeek, src }) {
  const dispatch = useDispatch();
  const stateVideo = useSelector(selectVideo);
  const { volume, isPlay, isMute, timePlayed } = stateVideo;
  const refVideo = useRef();
  useEffect(() => {
    const video = refVideo.current;
    if (video) {
      isPlay && !isSeek ? video.play() : video.pause();
    }
  }, [isPlay, isSeek]);

  useEffect(() => {
    const video = refVideo.current;
    if (video) {
      video.currentTime = timeSeek;
    }
  }, [timeSeek]);
  useEffect(() => {
    const video = refVideo.current;
    if (video) {
      video.volume = volume;
    }
  }, [volume]);
  useEffect(() => {
    const video = refVideo.current;
    if (video) {
      video.ontimeupdate = (e) => {
        if (typeof onChangeTime === 'function') {
          onChangeTime(e.target.currentTime);
        }
      };
    }
  }, [onChangeTime]);

  useEffect(() => {
    const video = refVideo.current;
    if (video) {
      video.load();
      video.currentTime = timePlayed;
      video.play();
      video.onplay = function () {
        dispatch(hanldeChangeIsPlay(true));
      };
    }
  }, [src, dispatch]);

  return (
    <video
      ref={refVideo}
      id="video"
      muted={isMute}
      autoPlay
    >
      <source src={src} />
    </video>
  );
}
export default Video;
