import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
const FlowNavBar: React.FC = () => {
    const location = useLocation();
  
    const isActiveLink = (pathname: string) => {
      return location.pathname === pathname ? 'text-blue-700 bg-gray-100' : 'text-black'; // checks if the current location is the same as the pathname - then changes the color of the link
    };

  return (
    <div>
      <nav className="bg-blue-700 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/dashboard" className={`flex items-center`}>
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="MUSA Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">MUSA</span>
          </Link>
          <div className="flex md:order-2">
            <Link to="/account" className="text-black hover:text-gray-700 px-4 py-2 rounded-md text-sm font-medium">
                <AccountCircleIcon  fontSize="large" sx={{ color: 'white' }} />
                <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-black">Account</span>
            </Link>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 " id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 text-xl  border border-gray-100 rounded-lg bg-blue-700 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-blue-700 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to="/dashboard" className={`block py-2 pl-3 pr-4  rounded  hover:bg-gray-100 ${isActiveLink('/dashboard')}`}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/community" className={`block py-2 pl-3 pr-4 rounded hover:bg-gray-100 ${isActiveLink('/community')}`}>
                  Community
                </Link>
              </li>
              <li>
                <Link to="/picOfDay" className={`block py-2 pl-3 pr-4 rounded hover:bg-gray-100 ${isActiveLink('/picOfDay')}`}>
                  Picture of the day
                </Link>
              </li>
              <li>
                <Link to="/nearMiss" className={`block py-2 pl-3 pr-4 rounded hover:bg-gray-100 ${isActiveLink('/nearMiss')}`}>
                  Near Miss
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
