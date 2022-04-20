import './thumbSong.scss';
function ThumbSong({ className, src, onClick }) {
  return (
    <div
      className={`thumb-song-container ${className} `}
      onClick={onClick}
    >
      <img src={src} alt="" />
      <div className="icon-box">
        <div
          className="play"
          style={{ width: '15px', height: '15px' }}
        ></div>
        <div
          className="ic-gif-loading-white"
          style={{ width: '15px', height: '15px' }}
        ></div>
        <div className="pause">
          <i
            className="icon action-play ic-play"
            style={{ fontSize: '15px' }}
          ></i>
        </div>
      </div>
    </div>
  );
}
export default ThumbSong;
