import Configure from './Configure';
import Monitor from './Monitor';
import Home from './Home';
import '../index.css';
import UserSettings from './UserSettings';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div id="App" className="block">
        <div id="sidenav" className="fixed left-0 top-0 w-60">
          <img
            src="canopy_logo.png"
            alt="canopy logo"
            className="inline-block h-24 w-24"
          />
          <h1 id="logo_text" className="inline-block pt-4 text-4xl">
            Canopy
          </h1>
          <div id="login_info" className="float-left m-8 block h-40 w-80">
            <img
              src="default_profile_pic.jpeg"
              alt="profile pic"
              className="float-left h-20 w-20 grow-0"
            />
            <div className="pl-24 pt-3 ">
              <p className="">username</p>
              <p className="text-red-400">Logout</p>
            </div>
          </div>

          <ul className="ml-20 block text-xl">
            <li className="pt-10">
              <Link to="/">Home</Link>
            </li>
            <li className="pt-10">
              <Link to="/configure">Configure</Link>
            </li>
            <li className="pt-10">
              <Link to="/monitor">Monitor</Link>
            </li>
            <li className="pt-10">
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
