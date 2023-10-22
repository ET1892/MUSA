import React from 'react'
import FlowNavBar from './FlowNavBar'

const NearMiss = () => {
    return (
        <div>
            <header>
                <FlowNavBar />
            </header>
            <body className="flex flex-col justify-center items-center space-evenly space-y-10 p-10 m-10">
                <h1>Near Miss</h1>
                <h3>Coming Soon</h3>
            </body>
        </div>
      )
}

export default NearMiss