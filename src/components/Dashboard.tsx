import FlowNavBar from './FlowNavBar'
import { Carousel } from 'flowbite-react';
const Dashboard = () => {
  return (
    <div className='h-screen bg-cover bg-no-repeat bg-stars-background'>
        <header className="mb-10">
            <FlowNavBar/>
        </header>
        <body  className="h-screen flex flex-col">
            <h1 className="uppercase text-xl font-bold text-white">Dashboard</h1>
            {/* <Carousel pauseOnHover>
                <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white text-white">
                  <h1>Slide 1</h1>
                </div>
                <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                  Slide 2
                </div>
                <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                  Slide 3
                </div>
            </Carousel> */}
        </body>
    </div>
  )
}

export default Dashboard