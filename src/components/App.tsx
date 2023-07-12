import Configure from './Configure';
import Monitor from './Monitor';
import Home from './Home';
import '../index.css';
import UserSettings from './UserSettings';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div id="App" className="flex">
        <div id="sidenav" className="inline-block min-h-full w-1/4">
          <img
            src="canopy_logo.png"
            alt="canopy logo"
            className="block h-24 w-24 grow-0"
          />
          <img
            src="profile.png"
            alt="profile pic"
            className="block h-24 w-24 grow-0"
          />
          <ul className="block">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/configure">Configure</Link>
            </li>
            <li>
              <Link to="/monitor">Monitor</Link>
            </li>
            <li>
              <Link to="/user_settings">User Settings</Link>
            </li>
          </ul>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/configure" element={<Configure />} />
          <Route path="/monitor" element={<Monitor />} />
          <Route path="/user_settings" element={<UserSettings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
