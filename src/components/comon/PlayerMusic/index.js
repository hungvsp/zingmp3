import './playermusic.scss';
import axios from 'axios';
import Slider from 'rc-slider';
import { Link } from 'react-router-dom';
import formatDuration from 'format-duration';
import { useSelector, useDispatch } from 'react-redux';
import { URL_GET_SONG } from '../../../constants/urlApi';
import { useState, useEffect, useCallback } from 'react';
import ContentLoader from 'react-content-loader';

import {
  haddleIsPlay,
  haddleIsLoop,
  haddleIsRandom,
  hanldeNextPrevSong,
  selectData,
} from '../../../redux/slice';

// state audio
import {
  hanldeChangeVolume,
  hanldeChangeisMute,
  hanldeChangeTimePlayed,
  selectAudio,
} from '../../../redux/audio';

import Audio from './audio';
import 'rc-slider/assets/index.css';
function PlayerMusic() {
  const [isSeek, setIsSeek] = useState(false);
  const [timeSeekOnchange, setTimeSeekOnchange] = useState(
    0
  );
  const [timeSeek, setTimeSeek] = useState(0);
  const [dataSong, setDataSong] = useState(null);

  const dispatch = useDispatch();
  const state = useSelector(selectData);

  const { isPlay, currentIdSong, isLoop, isRandom } = state;

  useEffect(() => {
    if (currentIdSong) {
      axios
        .get(URL_GET_SONG + currentIdSong)
        .then((data) => {
          if (data?.data?.err === 0) {
            setDataSong({
              isMv: !!data.data.infoSong.mvlink,
              src: data.data.data[128],
              encodeId: data.data.infoSong.encodeId,
              thumbnail: data.data.infoSong.thumbnail,
              thumbnailM: data.data.infoSong.thumbnailM,
              title: data.data.infoSong.title,
              duration: data.data.infoSong.duration,
              artists: data.data.infoSong.artists,
              artistsNames: data.data.artistsNames,
            });
          }
        });
    }
  }, [currentIdSong]);
  // hanldeClick

  const stateAudio = useSelector(selectAudio);
  const { volume, isMute, timePlayed } = stateAudio;
  const handleChangeTime = useCallback(
    (time) => {
      dispatch(hanldeChangeTimePlayed(time));
    },
    [dispatch]
  );
  const tipFormatter = (value) => (
    <span className="tooltip">{value}€</span>
  );
  const MyLoader = () => (
    <ContentLoader>
      <rect
        x="0"
        y="0"
        rx="5"
        ry="5"
        width="70"
        height="70"
      />
      <rect
        x="80"
        y="17"
        rx="4"
        ry="4"
        width="300"
        height="13"
      />
      <rect
        x="80"
        y="40"
        rx="3"
        ry="3"
        width="250"
        height="10"
      />
    </ContentLoader>
  );
  return (
    <div className="player-container ">
      <div className="controler-left">
        <div className="thumb-song-box">
          <div className=" is_64x64 thumb-img">
            <div className="card-thumb-box">
              {dataSong?.thumbnail ? (
                <img
                  src={dataSong?.thumbnail}
                  alt="nhac hay"
                />
              ) : (
                <MyLoader />
              )}
              <div className="card-actions"></div>
            </div>
          </div>
          <div className="thumb-content">
            <div className="song-title">
              <Link to={`/playlist/${dataSong?.encodeId}`}>
                {dataSong?.title}
              </Link>
            </div>
            <div className="sub-text">
              {dataSong?.artistsNames ||
                dataSong?.artists
                  ?.map((artist) => artist.name)
                  ?.join(' ,')}
            </div>
          </div>
        </div>
        <div className="icon-action-box">
          <button className="btn-reset mx-7">
            <i className="icon ic-like"></i>
          </button>
          <button className="btn-reset mx-7">
            <i className="icon icon ic-more"></i>
          </button>
        </div>
      </div>
      <div className="controler-center">
        <div className="lever-item ">
          <div className="icon-action-box">
            <button
              className="btn-reset mx-7 is_40x40 is-hover-circle  "
              onClick={() => {
                dispatch(haddleIsRandom(!isRandom));
              }}
            >
              <i
                className={`icon  ic-shuffle ${
                  isRandom ? 'active' : ''
                }`}
              ></i>
            </button>
            <button
              className="btn-reset mx-7 is_40x40 is-hover-circle"
              onClick={() => {
                dispatch(hanldeNextPrevSong(false));
              }}
            >
              <i className="icon ic-pre"></i>
            </button>
            <button
              className="btn-reset mx-7"
              onClick={() => {
                dispatch(haddleIsPlay(!isPlay));
              }}
            >
              <i
                className={`icon ic-${
                  isPlay ? 'pause' : 'play'
                }-circle-outline  fz-40`}
              ></i>
            </button>
            <button
              className="btn-reset mx-7 is_40x40 is-hover-circle btn-next"
              onClick={() => {
                dispatch(hanldeNextPrevSong(true));
              }}
            >
              <i className="icon ic-next"></i>
            </button>
            <button
              className="btn-reset mx-7 is_40x40 is-hover-circle "
              onClick={() => {
                dispatch(haddleIsLoop(!isLoop));
              }}
            >
              <i
                className={`icon ic-repeat ${
                  isLoop ? 'active' : ''
                }`}
              ></i>
            </button>
          </div>
        </div>
        <div className="lever-item ">
          <div className="time">
            {formatDuration(
              isSeek
                ? timeSeekOnchange * 1000
                : timePlayed * 1000,
              { leading: true }
            )}
          </div>
          <Slider
            value={isSeek ? timeSeekOnchange : timePlayed}
            min={0}
            max={dataSong?.duration}
            tipProps={{
              placement: 'top',
              prefixCls: 'rc-slider-tooltip',
              overlay: tipFormatter(10),
            }}
            railStyle={{
              height: 2,
            }}
            handleStyle={{
              height: 12,
              width: 12,
              backgroundColor:
                'var(--progressbar-active-bg))',
              border: 0,
              opacity: 1,
            }}
            onChange={(timeChange) => {
              setTimeSeekOnchange(timeChange);
              setIsSeek(true);
            }}
            onAfterChange={(timeAfterChange) => {
              setIsSeek(false);
              setTimeSeek(timeAfterChange);
            }}
          ></Slider>
          <div className="time right">
            {formatDuration(
              dataSong ? dataSong.duration * 1000 : 0,
              { leading: true }
            )}
          </div>
        </div>
      </div>
      <div className="controler-right">
        <div className="icon-action-box">
          <button className="btn-reset mx-7">
            <i className="icon ic-mv fz-20"> </i>
          </button>
          <button className="btn-reset mx-7">
            <i className="icon ic-karaoke fz-18"> </i>
          </button>
          <button className="btn-reset mx-7">
            <i className="icon ic-restore fz-18"> </i>
          </button>
          <button
            className="btn-reset mx-7"
            onClick={() => {
              dispatch(hanldeChangeisMute(!isMute));
            }}
          >
            {isMute || volume === 0 ? (
              <i className="icon ic-volume-mute fz-18"> </i>
            ) : (
              <i className="icon ic-volume fz-18"> </i>
            )}
          </button>
          <div className="bar-volume-box">
            <Slider
              value={isMute ? 0 : volume}
              min={0}
              max={1}
              step={0.01}
              railStyle={{
                height: 2,
              }}
              handleStyle={{
                height: 12,
                width: 12,
                backgroundColor:
                  'var(--progressbar-active-bg))',
                border: 0,
                opacity: 1,
              }}
              onChange={(volumeChange) => {
                dispatch(hanldeChangeVolume(volumeChange));
              }}
            ></Slider>
          </div>
        </div>
      </div>
      <Audio
        volume={volume}
        isMute={isMute}
        onChangeTime={handleChangeTime}
        timeSeek={timeSeek}
        src={dataSong?.src}
      ></Audio>
    </div>
  );
}

export default PlayerMusic;
