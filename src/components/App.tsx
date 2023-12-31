import '../index.css';
import UserSettings from './UserSettings';
import { useState, useEffect } from 'react';
import { CloudfrontInfo } from 'types/stats';
import { getCloudfrontInfo } from 'services/cloudfront';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import Paperbase from './Paperbase';
import Configure from './Configure';
import Monitor from './Monitor';
import Home from './Home';
import Alerts from './Alerts';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Outlet
} from 'react-router-dom';

function App() {
  const [cloudfrontInfo, setCloudfrontInfo] = useState([]);
  useEffect(() => {
    getCloudfrontInfo().then((res) => {
      setCloudfrontInfo(res);
    });
  }, []);

  const allCloudfrontDistroData = () => {
    return (
      <div>
        {cloudfrontInfo.map((singleDistroInfo) => {
          return (<div>{cloudfrontInfoData(singleDistroInfo)}</div>)
        })}
      </div>
    );
  };

  const fieldTransformation = {
    distributionId: 'Distribution ID',
    region: 'Region',
    deployed: 'Deployed'
  }

  const cloudfrontInfoData = (singleDistroInfo) => {
    const keys = Object.keys(singleDistroInfo);
    if (keys.length > 0) {
      return (
        <ul style={{ display: 'inline-block', listStyleType: 'none' }}>
          {keys.map((field) => {
            return (
              <li key={field}>
                <strong>{fieldTransformation[field]}</strong>: {singleDistroInfo[field]}
              </li>
            );
          })}
        </ul>
      );
    }
  };

  // return <Paperbase></Paperbase>;
  // }
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Paperbase></Paperbase>}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/configure"
              element={
                <Configure
                  cloudfrontInfo={cloudfrontInfo}
                  allCloudfrontDistroData={allCloudfrontDistroData}
                  cloudfrontInfoData={cloudfrontInfoData}
                />
              }
            />
            <Route
              path="/monitor"
              element={
                <Monitor
                  cloudfrontInfo={cloudfrontInfo}
                  allCloudfrontDistroData={allCloudfrontDistroData}
                  cloudfrontInfoData={cloudfrontInfoData}
                />
              }
            />
            <Route path="/user_settings" element={<UserSettings />} />
            <Route path="/Alerts" element={<Alerts />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

// const Layout = () => {
//   const style = ({ isActive }: { isActive: boolean }) => ({
//     fontWeight: isActive ? 'bold' : 'normal'
//   });
//   return <Navigator></Navigator>;
// };
//   return (
//     <main>
//       <div id="sidenav">
//         <img src="canopy_logo.png" alt="canopy logo" />
//         <h1 id="logo_text">Canopy</h1>
//         <div id="login_info">
//           <img src="default_profile_pic.jpeg" alt="profile pic" />
//           <div>
//             <p>username</p>
//             <p>Logout</p>
//           </div>
//         </div>

//         <ul>
//           <li>
//             <NavLink to="/" style={style}>
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/configure" style={style}>
//               Configure
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/monitor" style={style}>
//               Monitor
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/user_settings" style={style}>
//               User Settings
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/alerts" style={style}>
//               Alerts
//             </NavLink>
//           </li>
//         </ul>
//       </div>
//       <Outlet />
//     </main>
//   );
// };

// return (
//   <main>
//     <div id="sidenav">
//       <img src="canopy_logo.png" alt="canopy logo" />
//       <h1 id="logo_text">Canopy</h1>
//       <div id="login_info">
//         <img src="default_profile_pic.jpeg" alt="profile pic" />
//         <div>
//           <p>username</p>
//           <p>Logout</p>
//         </div>
//       </div>

//       <ul>
//         <li>
//           <NavLink to="/" style={style}>
//             Home
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/configure" style={style}>
//             Configure
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/monitor" style={style}>
//             Monitor
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/user_settings" style={style}>
//             User Settings
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/alerts" style={style}>
//             Alerts
//           </NavLink>
//         </li>
//       </ul>
//     </div>
//     <Outlet />
//   </main>
// );
// };

const NoMatch = () => {
  return <p>There&lsquo;s nothing here: 404!</p>;
};

export default App;
