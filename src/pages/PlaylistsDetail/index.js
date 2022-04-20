import './playlistsDetail.scss';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SectionBottom from './sectionBottom';
import {
  haddleIsPlay,
  selectData,
} from '../../redux/slice';
import Thumb from '../../components/comon/Thumb';
import ItemList from '../../components/comon/ItemList';
import ScrollIntoView from 'react-scroll-into-view-if-needed';

const PlaylistDetail = (props) => {
  const dispacth = useDispatch();
  const state = useSelector(selectData);
  const { listPLays, currentIdSong, isPlay } = state;
  const timeConverter = useCallback((timestamp) => {
    const times = new Date(timestamp * 1000);
    const year = times.getFullYear();
    const months = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '07',
      '09',
      '10',
      '11',
      '12',
    ];
    const month = months[times.getMonth()];

    const date = times
      .getDate()
      .toString()
      .padStart(2, '0');
    const time = date + '/' + month + '/' + year;
    return time;
  }, []);

  return (
    <div className="playlist-container main-scroll has-player-padding-bottom">
      <div className="wapper-sub">
        <div className="playlist-box ">
          <div className="media-box">
            <div className="playlist-thumb ">
              <Thumb src={listPLays?.thumbnail} />
            </div>
            <div className="playlist-info ">
              <div>
                <h3 className="title fz-20">
                  {listPLays?.title}
                </h3>
                {listPLays?.contentLastUpdate && (
                  <div className="release">
                    Cập nhật ngày:
                    {timeConverter(
                      listPLays.contentLastUpdate
                    )}
                  </div>
                )}
                {listPLays?.artistsNames && (
                  <div className="artists">
                    {listPLays?.artistsNames}
                  </div>
                )}
              </div>
              <div>
                <div
                  className="btn-play"
                  onClick={() => {
                    dispacth(haddleIsPlay(!isPlay));
                  }}
                >
                  {isPlay ? (
                    <span>
                      <i className="icon ic-pause"></i> DỪNG
                      PHÁT
                    </span>
                  ) : (
                    <span>
                      <i className="icon ic-play"></i> TIẾP
                      TỤC PHÁT
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="song-list-box">
            <div className="song-list-selection select-header  bor-b-1  ">
              <div className="song-list-box-left">
                <div className="icon-box text">
                  <i className="icon ic-24-Sort"></i>
                </div>
                <div className="title text">BÀI HÁT </div>
              </div>
              <div className="song-list-box-right">
                <div className="album text">Album</div>
                <div className="duration text">
                  THỜI GIAN
                </div>
              </div>
            </div>
            <div className="playlist-content">
              {listPLays?.song?.items?.map(
                (item, index) => {
                  const isActive =
                    item.encodeId === currentIdSong;
                  return (
                    <ScrollIntoView
                      active={isActive}
                      key={index}
                    >
                      <ItemList
                        isActive={isActive}
                        item={item}
                        index={index}
                      />
                    </ScrollIntoView>
                  );
                }
              )}
              {listPLays?.sections?.map(
                (section, index) => {
                  return (
                    <div key={index}>
                      <h3 className="section-title">
                        {section.title}
                      </h3>
                      {section.items?.map((item, index) => {
                        const isActive =
                          item.encodeId === currentIdSong;
                        return (
                          <ScrollIntoView
                            active={isActive}
                            key={index}
                          >
                            <ItemList
                              isActive={isActive}
                              item={item}
                              index={index}
                            />
                          </ScrollIntoView>
                        );
                      })}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
        <SectionBottom />
      </div>
    </div>
  );
};
export default PlaylistDetail;
