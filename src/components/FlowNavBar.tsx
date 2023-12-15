<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React from 'react';
>>>>>>> parent of 94b36fe (host)
import { Link, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import ForumIcon from '@mui/icons-material/Forum';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
<<<<<<< HEAD

const FlowNavBar: React.FC = () => {
  const location = useLocation();
  const [showPicOfDayDropdown, setShowPicOfDayDropdown] = useState(false);
  const [picOfDayDropdownText, setPicOfDayDropdownText] = useState('');
  const [showNearMissDropdown, setShowNearMissDropdown] = useState(false);
  const [nearMissDropdownText, setNearMissDropdownText] = useState('');
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [accountDropdownText, setAccountDropdownText] = useState('');
  const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);
  const [communityDropdownText, setCommunityDropdownText] = useState('');

  const handleMouseEnter = (text: string, setDropdown: React.Dispatch<React.SetStateAction<boolean>>, setText: React.Dispatch<React.SetStateAction<string>>) => {
    setText(text);
    setDropdown(true);
  };

  const handleMouseLeave = (setDropdown: React.Dispatch<React.SetStateAction<boolean>>) => {
    setDropdown(false);
  };

  const isActiveLink = (pathname: string) => {
    return location.pathname === pathname ? 'text-white bg-gray-800' : 'text-white bg-gray-000';
  };

  return (
    <div>
      <nav className="flex flex-row justify-center items-center bg-[#111113] w-full z-20 top-0 left-0 text-white">
        <div className="max-w-screen-xl p-0">
          <div className="flex flex-row" id="navbar-sticky">
            <ul className="flex flex-row items-center p-3 mt-4 text-lg">
              <li className="mr-20">
                <Link to="/dashboard" className={`py-2 pl-3 pr-4 ml-0`}>
                  <img src="../pictures/MUSA.png" className="h-20 mr-3 rounded-full" alt="MUSA Logo" />
                </Link>
              </li>
              <li className="mr-20">
                <div
                  onMouseEnter={() => handleMouseEnter("NASA's selection of the best images daily", setShowPicOfDayDropdown, setPicOfDayDropdownText)}
                  onMouseLeave={() => handleMouseLeave(setShowPicOfDayDropdown)}
                >
                  <Link to="/picOfDay" className={`py-2 pl-3 pr-4 rounded hover:bg-gray-500 ${isActiveLink('/picOfDay')}`}>
                    <CameraEnhanceIcon fontSize="large" sx={{ color: 'white' }} />
                    <span className="self-center text-lg font-semibold whitespace-nowrap text-white">Picture of the day</span>
                  </Link>
                  {showPicOfDayDropdown && <div className="dropdown fixed text-center">
                  <p style={{ maxWidth: '200px' }}>{picOfDayDropdownText}</p>
                    </div>}
                </div>
              </li>
              <li className="mr-20">
                <div
                  onMouseEnter={() => handleMouseEnter("Visualiser of close encounters to Earth", setShowNearMissDropdown, setNearMissDropdownText)}
                  onMouseLeave={() => handleMouseLeave(setShowNearMissDropdown)}
                >
                  <Link to="/nearMiss" className={`py-2 pl-3 pr-4 rounded hover:bg-gray-500 ${isActiveLink('/nearMiss')}`}>
                    <CallMissedOutgoingIcon fontSize="large" sx={{ color: 'white' }} />
                    <span className="self-center text-lg font-semibold whitespace-nowrap text-white">Near Miss</span>
                  </Link>
                  {showNearMissDropdown && <div className="dropdown fixed ">
                  <p style={{ maxWidth: '200px' }}>{nearMissDropdownText}</p>
                    </div>}
                </div>
              </li>
              <li className="mr-20">
                <div
                  onMouseEnter={() => handleMouseEnter("User account settings", setShowAccountDropdown, setAccountDropdownText)}
                  onMouseLeave={() => handleMouseLeave(setShowAccountDropdown)}
                >
                  <Link to="/account" className={`py-2 pl-3 pr-4 rounded hover:bg-gray-500 ${isActiveLink('/account')}`}>
                    <AccountCircleIcon  fontSize="large" sx={{ color: 'white' }} />
                    <span className="self-center text-lg font-semibold whitespace-nowrap text-white">Account</span>
                  </Link>
                  {showAccountDropdown && <div className="dropdown fixed">
                  <p style={{ maxWidth: '200px' }}>{accountDropdownText}</p>
                    </div>}
                </div>
              </li>
              <li className="mr-20">
                <div
                  onMouseEnter={() => handleMouseEnter("Community discussions", setShowCommunityDropdown, setCommunityDropdownText)}
                  onMouseLeave={() => handleMouseLeave(setShowCommunityDropdown)}
                >
                  <Link to="/community" className={`py-2 pl-3 pr-4 rounded hover:bg-gray-500 ${isActiveLink('/community')}`}>
                    <ForumIcon  fontSize="large" sx={{ color: 'white' }} />
                    <span className="self-center text-lg font-semibold whitespace-nowrap text-white">Community</span>
                  </Link>
                  {showCommunityDropdown && <div className="dropdown fixed">
                    <p style={{ maxWidth: '200px' }}>{communityDropdownText}</p>

                    </div>}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
=======
const FlowNavBar: React.FC = () => {
    const location = useLocation();
  
    const isActiveLink = (pathname: string) => {
        return location.pathname === pathname ? 'text-white bg-gray-800' : 'text-white bg-gray-000';
    };

    return (
        <div>
            <nav className="flex flex-row justify-center items-center bg-[#111113] w-full z-20 top-0 left-0 text-white">
                <div className="max-w-screen-xl p-3"  >
                    <div className="flex flex-row" id="navbar-sticky">
                        <ul className="flex flex-row  items-center p-4 mt-4 text-lg">
                            <li>
                                <Link to="/dashboard" className={`py-2 pl-3 pr-4  ml-0`}>
                                    <img src="../pictures/MUSA.png" className="h-20 mr-3 rounded-full" alt="MUSA Logo" />
                                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black"></span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/picOfDay" className={`py-2 pl-3 pr-4 rounded hover:bg-gray-500 ${isActiveLink('/picOfDay')}`}>
                                    <CameraEnhanceIcon fontSize="large" sx={{ color: 'white' }} />
                                    <span className="self-center text-lg font-semibold whitespace-nowrap text-white">Picture of the day</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/nearMiss" className={`py-2 pl-3 pr-4 rounded hover:bg-gray-500 ${isActiveLink('/nearMiss')}`}>
                                    <CallMissedOutgoingIcon fontSize="large" sx={{ color: 'white' }} />
                                    <span className="self-center text-lg font-semibold whitespace-nowrap text-white">Near Miss</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/account" className={`py-2 pl-3 pr-4 rounded hover:bg-gray-500 ${isActiveLink('/account')}`}>
                                    <AccountCircleIcon  fontSize="large" sx={{ color: 'white' }} />
                                    <span className="self-center text-lg font-semibold whitespace-nowrap text-white">Account</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/community" className={`py-2 pl-3 pr-4 rounded hover:bg-gray-500 ${isActiveLink('/community')}`}>
                                    <ForumIcon  fontSize="large" sx={{ color: 'white' }} />
                                    <span className="self-center text-lg font-semibold whitespace-nowrap text-white">Community</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
>>>>>>> parent of 94b36fe (host)
};

export default FlowNavBar;
