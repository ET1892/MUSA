import FlowNavBar from './FlowNavBar'

const Dashboard = () => {
  return (
    <div className='bg-cover bg-no-repeat bg-center bg-fixed bg-stars-background'>
        <header>
            <FlowNavBar/>
        </header>
        <body className="grid place-items-center h-screen  p-10 m-10">
            <h1>Dashboard</h1>
            <h3>Coming Soon</h3>
        </body>
        <footer>
          <h1 className="grid place-items-center h-screen  ">Footer</h1>
        </footer>
    </div>
  )
}

export default Dashboard