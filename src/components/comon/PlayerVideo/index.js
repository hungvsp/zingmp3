import './playerVideo.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import formatDuration from 'format-duration';
import SettingsMenu from './settingsMenu';
import Slider from 'rc-slider';
import Video from './video';

import {
  selectVideo,
  hanldeChangeIsPlay,
  hanldeChangeVolume,
  hanldeChangeisMute,
  hanldeChangeTimePlayed,
} from '../../../redux/video';

function PlayerVideo() {
  const [timeSeek, setTimeSeek] = useState(0);
  const [src, setSrc] = useState('');
  const [isSeek, setIsSeek] = useState(false);
  const [isShowBarVol, setIsShowBarVol] = useState(false);
  const stateVideo = useSelector(selectVideo);
  const {
    isPlay,
    volume,
    isMute,
    timePlayed,
    sources,
    videoCurrent,
  } = stateVideo;
  const [isFull, setIsFull] = useState(false);
  const [isShowSetting, setIsShowSetting] = useState(false);
  const dispacth = useDispatch();
  const refVideoBox = useRef();
  useEffect(() => {
    const videoBox = refVideoBox.current;
    if (isFull) {
      if (videoBox.webkitRequestFullscreen) {
        videoBox.webkitRequestFullscreen();
      } else if (videoBox.mozRequestFullScreen) {
        videoBox.mozRequestFullScreen();
      } else if (videoBox.msRequestFullScreen) {
        videoBox.msRequestFullScreen();
      } else if (videoBox.RequestFullScreen) {
        videoBox.RequestFullScreen();
      }
    } else {
      if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, [isFull]);
  useEffect(() => {
    setSrc(sources[Object.keys(sources)[0]]);
    dispacth(hanldeChangeTimePlayed(0));
  }, [sources, dispacth]);
  return (
    <div
      className={`video-box ${isFull ? 'full-video' : ''}`}
      ref={refVideoBox}
    >
      <div className="video-center">
        <Video
          src={src}
          onChangeTime={(currentTime) => {
            dispacth(hanldeChangeTimePlayed(currentTime));
          }}
          timeSeek={timeSeek}
          isSeek={isSeek}
        />
      </div>
      <div className="controls-video">
        <div className="slide-bar">
          <Slider
            min={0}
            max={videoCurrent.duration}
            step={0.01}
            value={isSeek ? timeSeek : timePlayed}
            onBeforeChange={() => {
              setIsSeek(true);
            }}
            onChange={(time) => {
              setTimeSeek(time);
            }}
            onAfterChange={(time) => {
              setIsSeek(false);
              dispacth(hanldeChangeTimePlayed(time));
            }}
          />
        </div>
        <div className="control-btn-box">
          <div className="btn-left-box">
            <button className="btn-reset btn-icon">
              <span className="icon fz-20 ic-pre"></span>
            </button>
            <button
              className="btn-reset btn-icon"
              onClick={() => {
                dispacth(hanldeChangeIsPlay(!isPlay));
              }}
            >
              {isPlay ? (
                <span className="icon fz-30 pl-ic-pause"></span>
              ) : (
                <span className="icon fz-30 pl-ic-play_arrow"></span>
              )}
            </button>
            <button className="btn-reset btn-icon">
              <span className="icon fz-20 ic-next"></span>
            </button>
            <button
              className="btn-reset btn-icon"
              onClick={() => {
                dispacth(hanldeChangeisMute(!isMute));
              }}
              onMouseEnter={() => setIsShowBarVol(true)}
              onMouseLeave={() => setIsShowBarVol(false)}
            >
              {!volume || isMute ? (
                <span className="icon fz-20 pl-ic-volume_off"></span>
              ) : (
                <span className="icon fz-20 pl-ic-volume_up"></span>
              )}
            </button>
            <div
              className={`bar-volume ${
                isShowBarVol ? 'show' : ''
              }`}
            >
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={isMute ? 0 : volume}
                onChange={(value) => {
                  dispacth(hanldeChangeVolume(value));
                }}
              />
            </div>
            <div className="duration-time">
              <span>
                {formatDuration(
                  isSeek
                    ? timeSeek * 1000
                    : timePlayed * 1000,
                  { leading: true }
                )}
              </span>
              <span className="mx-7">|</span>
              <span>
                {formatDuration(
                  videoCurrent.duration * 1000,
                  {
                    leading: true,
                  }
                )}
              </span>
            </div>
          </div>
          <div className="btn-right-box">
            <button className="btn-reset btn-icon">
              <span className="icon ic-repeat"></span>
            </button>
            <button
              className="btn-reset btn-icon"
              onClick={() => {
                setIsShowSetting(!isShowSetting);
              }}
            >
              <span className="icon pl-ic-settings"></span>
            </button>
            {!isFull ? (
              <button className="btn-reset btn-icon">
                <span className="icon pl-ic-theater-mini"></span>
              </button>
            ) : (
              ''
            )}

            <button
              className="btn-reset btn-icon"
              onClick={() => {
                setIsFull(!isFull);
              }}
            >
              {isFull ? (
                <span className=" icon pl-ic-fullscreen_exit"></span>
              ) : (
                <span className="icon pl-ic-fullscreen"></span>
              )}
            </button>
            {isShowSetting && (
              <div className="setting">
                <SettingsMenu
                  setSrc={setSrc}
                  srcCurrent={src}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default PlayerVideo;
