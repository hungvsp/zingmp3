import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectData,
  hanldeNextPrevSong,
  haddleIsLoading,
  haddleIsPlay,
} from '../../../redux/slice';
import { hanldeChangeTimePlayed } from '../../../redux/audio';

function Audio({
  onChangeTime,
  onEnded,
  timeSeek,
  src,
  volume,
  isMute,
}) {
  const state = useSelector(selectData);
  const dispatch = useDispatch();
  const { isPlay, isLoop } = state;
  const audioRef = useRef();

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      isPlay ? audio.play() : audio.pause();
      dispatch(hanldeChangeTimePlayed(audio.currentTime));
    }
  }, [isPlay, dispatch]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.currentTime = timeSeek;
  }, [timeSeek]);

  useEffect(() => {
    const audio = audioRef.current;
    if (typeof onChangeTime === 'function') {
      audio.ontimeupdate = () => {
        onChangeTime(audio.currentTime);
      };
    }
  }, [onChangeTime]);
  useEffect(() => {
    const audio = audioRef.current;
    audio.load();
    audio.onloadstart = () => {
      dispatch(haddleIsLoading(true));
    };
    audio.onloadeddata = () => {
      dispatch(haddleIsLoading(false));
    };
    audio.onplay = () => {
      dispatch(haddleIsPlay(true));
    };
  }, [src, dispatch]);
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;
  }, [volume]);
  // next went play finish
  if (audioRef.current) {
    audioRef.current.onended = () => {
      dispatch(hanldeNextPrevSong(true));
    };
    audioRef.current.onerror = () => {
      dispatch(hanldeNextPrevSong(true));
    };
  }
  return (
    <audio
      ref={audioRef}
      autoPlay={isPlay}
      muted={isMute}
      loop={isLoop}
    >
      <source src={src} type="audio/mpeg" />
    </audio>
  );
}
export default Audio;
