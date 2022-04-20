import Card from '../comon/Card';
import './sectionPlaylists.scss';

function PlayListBox(data) {
  return (
    <div className="section-playlist-container">
      {data?.data?.title && (
        <h3 className="title-section-playlist">
          {data.data.title}
        </h3>
      )}
      <div className="section-playlist-card">
        {data.data.items.map((item, index) => {
          if (!(index > 4)) {
            return (
              <div
                className="playlist-card-item"
                key={index}
              >
                <Card key={index} item={item} />
              </div>
            );
          } else {
            return '';
          }
        })}
      </div>
    </div>
  );
}

export default PlayListBox;
