import './itemVideo.scss';
import ThumbVideo from '../ThumbVideo';

function ItemVideo({ item }) {
  return (
    <div className="item-video-box">
      <ThumbVideo item={item} />
      <div className="video-info">
        <div className="avatar-artist">
          <img
            src={item.artists && item.artists[0]?.thumbnail}
            alt={item.artists && item.artists[0]?.name}
          />
        </div>
        <div className="title-artist-video">
          <div className="tittle-video">{item.title}</div>
          <div>{item.artistsNames}</div>
        </div>
      </div>
    </div>
  );
}
export default ItemVideo;
