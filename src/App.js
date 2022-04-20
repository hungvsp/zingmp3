import './App.css';

import Home from './pages/Home';
import PlaylistsDetail from './pages/PlaylistsDetail';

import Video from './pages/Video';
import Search from './pages/Search';
import Modal from './components/Modal';
import Header from './components/Header';
import SideBar from './components/SideBar';
import PlayerMusic from './components/comon/PlayerMusic';
import { PLAYLIST, VIDEO, SEARCH } from './constants/slug';

// routers
import { Routes, Route } from 'react-router-dom';
//redux
import { useSelector } from 'react-redux';
import { selectData } from './redux/slice';

function App() {
  const state = useSelector(selectData);
  const { currentIdSong, isPlay, isLoading } = state;
  return (
    <div
      className={`app 
        ${currentIdSong ? 'has-player' : ''}
        ${isPlay ? 'playing' : 'no-playing'}
        ${isLoading ? 'loading' : 'no-loading'}
      `}
    >
      <div className="col-sidebar-md">
        <div className=" pop-fixed">
          <SideBar />
        </div>
      </div>

      <div className="col-right-md">
        <Header className="pop-sticky" />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path={`${SEARCH}`}
            element={<Search />}
          />
          <Route
            exact
            path={`${PLAYLIST}/:id`}
            element={<PlaylistsDetail />}
          />
        </Routes>
      </div>
      <div xs={12} md={12} className="px-0">
        <PlayerMusic />
      </div>
      <Routes>
        <Route
          exact
          path={`${VIDEO}`}
          element={<Video />}
        />
      </Routes>
      <Modal isShowing={true} />
    </div>
  );
}

export default App;
