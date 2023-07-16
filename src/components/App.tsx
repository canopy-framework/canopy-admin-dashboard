import Configure from './Configure';
import Monitor from './Monitor';
import Home from './Home';
import Alerts from './Alerts';
import '../index.css';
import UserSettings from './UserSettings';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Outlet
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div id="App" className="block">
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Configure />} />
            <Route path="/configure" element={<Configure />} />
            <Route path="/monitor" element={<Monitor />} />
            <Route path="/user_settings" element={<UserSettings />} />
            <Route path="/Alerts" element={<Alerts />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

const Layout = () => {
  const style = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal'
  });

  return (
    <main>
      <div id="sidenav" className="fixed left-0 top-0 w-60">
        <img
          src="canopy_logo.png"
          alt="canopy logo"
          className="inline-block h-24 w-24"
        />
        <h1 id="logo_text" className="inline-block pt-4 text-4xl">
          Canopy
        </h1>
        <div id="login_info" className="float-left m-8 block h-40 w-40">
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
            <NavLink to="/" style={style}>
              Home
            </NavLink>
          </li>
          <li className="pt-10">
            <NavLink to="/configure" style={style}>
              Configure
            </NavLink>
          </li>
          <li className="pt-10">
            <NavLink to="/monitor" style={style}>
              Monitor
            </NavLink>
          </li>
          <li className="pt-10">
            <NavLink to="/user_settings" style={style}>
              User Settings
            </NavLink>
          </li>
          <li className="pt-10">
            <NavLink to="/alerts" style={style}>
              Alerts
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </main>
  );
};

const NoMatch = () => {
  return <p>There&lsquo;s nothing here: 404!</p>;
};

export default App;
