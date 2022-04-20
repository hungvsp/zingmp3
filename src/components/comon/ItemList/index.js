import './itemList.scss';
import ShowItemSong from '../ShowItemSong';
import formatDuration from 'format-duration';
function ItemList({ isActive, item, index }) {
  return (
    <div
      className={`song-list-selection  bor-b-1 is_hover ${
        isActive ? 'active' : ''
      }`}
    >
      <div className="song-list-box-left">
        <div className="icon-box text">
          <i className="icon ic-song"></i>
        </div>
        <ShowItemSong item={item} index={index} />
      </div>
      <div className="song-list-box-right">
        <div className="album text">
          {item.album?.title}
        </div>
        <div className="duration">
          {formatDuration(item.duration * 1000, {
            leading: true,
          })}
        </div>
      </div>
    </div>
  );
}
export default ItemList;
