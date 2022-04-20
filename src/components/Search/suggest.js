import './suggest.scss';
import ShowItemSong from '../../components/comon/ShowItemSong';
import { getDetailPlaylistsByIdSong } from '../../redux/slice';
import { useDispatch } from 'react-redux';
function Suggest({ data }) {
  const dispacth = useDispatch();
  return (
    <div>
      <div className="bor-t-1"></div>
      <h3 className="tittle">Gợi ý kết quả</h3>
      <ul className="suggest-box">
        {data &&
          data.map((item, index) => {
            if (item.type === 1)
              return (
                <li
                  className="suggest-item"
                  key={index}
                  onClick={() => {
                    dispacth(
                      getDetailPlaylistsByIdSong(item.id)
                    );
                  }}
                >
                  <ShowItemSong item={item} />
                </li>
              );
            return '';
          })}
      </ul>
    </div>
  );
}
export default Suggest;
