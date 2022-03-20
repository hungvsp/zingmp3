import './App.css';
import { Row, Col } from 'react-flexbox-grid';

import Home from './pages/Home';
import Slide from './components/Slide';
import SideBar from './components/SideBar';
import Player from './components/Player';
import Header from './components/Header';
import Test from './pages/Test';

function App() {
  return (
    <Row>
      <Col className="col-sidebar-md">
        <SideBar />
      </Col>
      <Col xs={10} md={10}>
        <Row>
          <Col xs={12} md={12} className="px-0">
            <Header />
          </Col>
          <Col xs={12} md={12} className="px-0">
            <Home />
          </Col>
          <Col xs={12} md={12} className="px-0">
            <Test />
          </Col>
        </Row>
      </Col>

      <Col xs={12} md={12} className="px-0">
        <Player />
      </Col>
    </Row>
  );
}

export default App;
