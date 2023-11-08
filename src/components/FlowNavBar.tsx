import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import ForumIcon from '@mui/icons-material/Forum';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
const FlowNavBar: React.FC = () => {
    const location = useLocation();
  
    const isActiveLink = (pathname: string) => {
        return location.pathname === pathname ? 'text-white bg-gray-800' : 'text-white bg-gray-000';
    };

    return (
        <div>
            <nav className="flex flex-row justify-center items-center bg-[#111113] fixed w-full z-20 top-0 left-0 text-white">
                <div className="max-w-screen-xl p-1"  >
                    <div className="flex flex-row" id="navbar-sticky">
                        <ul className="flex flex-row  items-center p-4 mt-4 text-lg">
                            <li>
                                <Link to="/dashboard" className={`py-2 pl-3 pr-4  ml-0`}>
                                    <img src="../pictures/MUSA.png" className="h-14 mr-3" alt="MUSA Logo" />
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
};

export default FlowNavBar;
