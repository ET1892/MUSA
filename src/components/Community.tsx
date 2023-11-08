import React from 'react'
import FlowNavBar from './FlowNavBar'
import Chat from './Chat'
import { Send } from '@mui/icons-material'
import SendCommunityMessage from './SendCommunityMessage'
const Community = () => {
    return (
        <div>
            <header>
                <FlowNavBar />
            </header>
            <body className="h-screen flex justify-center items-center space-evenly space-y-10">
                <Chat />
            </body>
            <SendCommunityMessage/>
        </div>
      )
}

export default Community