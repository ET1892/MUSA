import React from 'react'
import FlowNavBar from './FlowNavBar'
import Chat from './Chat'
import { Send } from '@mui/icons-material'
import SendCommunityMessage from './SendCommunityMessage'
const Community = () => {
    return (
        <div className="flex flex-col h-screen ">
            <header>
                <FlowNavBar />
            </header>
            <main className="flex-1 flex flex-col bg-black ">
                <div className="flex-grow overflow-auto">
                    <Chat/> 
                </div>
            </main>
        </div>
      )
}

export default Community