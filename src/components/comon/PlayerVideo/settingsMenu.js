import { useSelector, useDispatch } from 'react-redux';
import { selectVideo } from '../../../redux/video';

function SettingsMenu({ setSrc, srcCurrent }) {
  const { sources } = useSelector(selectVideo);
  const dispacth = useDispatch();
  return (
    <div className="setting-containner">
      <div className="setting-header">
        <h3 className="title">Chất lượng</h3>
      </div>

      <ul className="setting-box">
        {Object.keys(sources).map((label, index) => {
          if (sources[label]) {
            const isActive = srcCurrent === sources[label];
            return (
              <li
                className={`setting-item ${
                  isActive ? 'active' : ''
                }`}
                onClick={() => {
                  if (typeof setSrc === 'function')
                    setSrc(sources[label]);
                }}
              >
                {isActive && (
                  <span className="icon pl-ic-done"></span>
                )}
                <span>{label}</span>
              </li>
            );
            return '';
          }
        })}
      </ul>
    </div>
  );
}
export default SettingsMenu;
