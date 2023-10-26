import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import ForumIcon from '@mui/icons-material/Forum';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
const FlowNavBar: React.FC = () => {
    const location = useLocation();
  
    const isActiveLink = (pathname: string) => {
      return location.pathname === pathname ? 'text-white bg-gray-800' : 'text-white bg-gray-000'; // checks if the current location is the same as the pathname - then changes the color of the link
    };

  return (
    <div>
      <nav className="bg-solarSystem-background bg-cover bg-no-repeat bg-center fixed w-full z-20 top-0 left-0 h-25 text-white">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className=" flex flex-row w-full " id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 text-xl border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                  <Link to="/dashboard" className={`flex py-2 pl-3 pr-4`}>
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="MUSA Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">MUSA</span>
                  </Link>
              </li>
              <li>
                <Link to="/community" className={`block py-2 pl-3 pr-4 rounded hover:bg-gray-500 ${isActiveLink('/community')}`}>
                  <ForumIcon  fontSize="large" sx={{ color: 'white' }} />
                  <span className="self-center text-lg font-semibold whitespace-nowrap text-white">Community</span>
                </Link>
              </li>
              <li>
                <Link to="/picOfDay" className={`block py-2 pl-3 pr-4 rounded hover:bg-gray-500 ${isActiveLink('/picOfDay')}`}>
                  <CameraEnhanceIcon fontSize="large" sx={{ color: 'white' }} />
                  <span className="self-center text-lg font-semibold whitespace-nowrap text-white">Picture of the day</span>
                </Link>
              </li>
              <li>
                <Link to="/nearMiss" className={`block py-2 pl-3 pr-4 rounded hover:bg-gray-500 ${isActiveLink('/nearMiss')}`}>
                <CallMissedOutgoingIcon fontSize="large" sx={{ color: 'white' }} />
                  <span className="self-center text-lg font-semibold whitespace-nowrap text-white">Near Miss</span>
                </Link>
              </li>
              <li>
                <Link to="/account" className={`block py-2 pl-3 pr-4 rounded hover:bg-gray-500 ${isActiveLink('/account')}`}>
                  <AccountCircleIcon  fontSize="large" sx={{ color: 'white' }} />
                  <span className="self-center text-lg font-semibold whitespace-nowrap text-white">Account</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>

  );
};

export default FlowNavBar;
