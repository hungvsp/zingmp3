import './thumb.scss';

function Thumb(props) {
  const {
    src,
    isHoverLike,
    isHoverPlay,
    isHoverMore,
    isDarkBg,
    isActive,
  } = props;
  return (
    <div className="card-thumb-box">
      <img src={src} alt="nhac hay" />
      {isDarkBg && <div className="opacity-bg"></div>}
      <div
        className={`card-actions ${
          isActive ? 'active' : 'has-hover'
        }`}
      >
        {(isHoverLike || isActive) && (
          <button
            className={`btn-icon-action ${
              isActive ? '' : 'is-hover-circle'
            }`}
          >
            <i className="icon ic-like"></i>
          </button>
        )}
        {(isHoverPlay || isActive) && (
          <button
            className={`btn-icon-action ${
              isActive ? '' : 'is-hover-circle'
            }`}
          >
            <i className="icon action-play ic-svg-play-circle"></i>
            <div className="ic-gif-playing-white icon-playing"></div>
          </button>
        )}

        {(isHoverMore || isActive) && (
          <button
            className={`btn-icon-action ${
              isActive ? '' : 'is-hover-circle'
            }`}
          >
            <div className="icon ic-ball"></div>
            <div className="icon ic-ball"></div>
            <div className="icon ic-ball"></div>
          </button>
        )}
      </div>
    </div>
  );
}
export default Thumb;
