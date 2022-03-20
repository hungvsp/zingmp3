import './sideBar.scss';
function SideBar() {
  return (
    <div className="sidebar-container has-player">
      <div className="logo-box">
        <div className="logo"></div>
      </div>
      <ul className="nav-box is-border-bottom ">
        <li className="nav-item">
          <a href="/" className="nav-item-link">
            <span className="icon-box">
              <i class="icon  ic-24-LibraryTab"></i>
            </span>
            <span className="nav-text">Cá Nhân</span>
          </a>
        </li>
        <li className="nav-item active ">
          <a href="/" className="nav-item-link">
            <span className="icon-box">
              <i class="icon  ic-24-HomeTab"></i>
            </span>
            <span className="nav-text">Khám Phá</span>
          </a>
        </li>
        <li className="nav-item ">
          <a href="/" className="nav-item-link">
            <span className="icon-box">
              <i class="icon  ic-24-ChartTab"></i>
            </span>
            <span className="nav-text">#zingchart</span>
          </a>
        </li>
        <li className="nav-item ">
          <a href="/" className="nav-item-link">
            <span className="icon-box">
              <i class="icon  ic-24-RadioTab"></i>
            </span>
            <span className="nav-text">Radio</span>
          </a>
        </li>
        <li className="nav-item ">
          <a href="/" className="nav-item-link">
            <span className="icon-box">
              <i class="icon  ic-24-FeedTab"></i>
            </span>
            <span className="nav-text">Theo Dõi</span>
          </a>
        </li>
      </ul>
      <div className="over-scroll scroll-nav is-mark">
        <ul className="nav-box">
          <li className="nav-item">
            <a href="/" className="nav-item-link">
              <span className="icon-box">
                <i class="icon  icon  ic-24-NewReleaseTab"></i>
              </span>
              <span className="nav-text">Nhạc Mới</span>
            </a>
          </li>
          <li className="nav-item active ">
            <a href="/" className="nav-item-link">
              <span className="icon-box">
                <i class="icon  ic-24-GenreTab"></i>
              </span>
              <span className="nav-text">Thể Loại</span>
            </a>
          </li>
          <li className="nav-item ">
            <a href="/" className="nav-item-link">
              <span className="icon-box">
                <i class="icon  ic-24-Top100Tab"></i>
              </span>
              <span className="nav-text">Top 100</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-item-link">
              <span className="icon-box">
                <i class="icon  ic-24-MVTab"></i>
              </span>
              <span className="nav-text">MV</span>
            </a>
          </li>
        </ul>
        <div className="vip-banner-box">
          <div className="vip-banner">
            <div className="text">
              Nghe nhạc không quảng cáo cùng kho nhạc VIP
            </div>
            <a href="/" className="btn-sign-vip">
              NÂNG CẤP VIP
            </a>
          </div>
        </div>
        <div className="my-music-box">
          <div className="title ">THƯ VIỆN</div>
          <ul className="nav-box">
            <li className="nav-item">
              <a href="/" className="nav-item-link">
                <span className="icon-box">
                  <i className="icon">
                    <img
                      src="https://zjs.zadn.vn/zmp3-desktop/releases/v1.0.13/static/media/my-song.cf0cb0b4.svg"
                      alt=""
                    />
                  </i>
                </span>
                <span className="nav-text">Bài hát</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-item-link">
                <span className="icon-box">
                  <i className="icon">
                    <img
                      src="https://zjs.zadn.vn/zmp3-desktop/releases/v1.0.13/static/media/my-playlist.7e92a5f0.svg"
                      alt=""
                    />
                  </i>
                </span>
                <span className="nav-text">Playlist</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-item-link">
                <span className="icon-box">
                  <i className="icon">
                    <img
                      src="https://zjs.zadn.vn/zmp3-desktop/releases/v1.0.13/static/media/my-playlist.7e92a5f0.svg"
                      alt=""
                    />
                  </i>
                </span>
                <span className="nav-text">Gần đây</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="add-playlist-box">
        <div className="btn-add-playlist">
          <i className="icon ic-add"></i>
          <span className="text">Tạo playlist mới</span>
        </div>
      </div>
    </div>
  );
}
export default SideBar;
