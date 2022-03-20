import './header.scss';
import iconTheme from '../../asset/imgIcon/theme.png';
import Search from '../Search';
function Header() {
  return (
    <div className="header-container ">
      <div className="wapper-sub">
        <div className="header-box  ">
          <div className="header-left-box">
            <div className="btn-box">
              <button
                className="btn-back btn btn-primary"
                disabled
              >
                <i className="icon ic-back"></i>
              </button>
              <button className="btn-forward btn btn-primary">
                <i className="icon ic-forward"></i>
              </button>
            </div>
            <div className="search-box">
              <Search />
            </div>
          </div>
          <div className="header-right-box">
            <ul className="setting-box">
              <li className="setting-item">
                <i className="icon">
                  <img src={iconTheme} alt="" />
                </i>
              </li>
              <li className="setting-item">
                <a href="/">
                  <i className="icon ic-20-VIP-2"></i>
                </a>
              </li>
              <li className="setting-item">
                <a href="/">
                  <i className="icon ic-upload"></i>
                </a>
              </li>
              <li className="setting-item">
                <a href="/">
                  <i className="icon ic-settings"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
