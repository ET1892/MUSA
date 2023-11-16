import React, { useEffect, useState } from 'react'
import {db} from '../config/firebase'
import {collection,QueryDocumentSnapshot,DocumentData,query,limit,onSnapshot,doc,deleteDoc} from "@firebase/firestore";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {CircularProgress, Box} from '@mui/material';
import { useAuth } from './AuthContext'; 
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Send } from '@mui/icons-material';
import SendCommunityMessage from './SendCommunityMessage'



const Chat = () => {
  const [messages, setMessages] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

  const database = collection(db, 'messages');
  const [loading,setLoading] = useState<boolean>(true);
  const [currentUserID, setCurrentUserID] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const dBQuery = query(database, limit(10));
    const unsubscribe = onSnapshot(dBQuery, (querySnapshot) => {
      const updatedMessages: QueryDocumentSnapshot<DocumentData>[] = [];
      querySnapshot.forEach((snapshot) => {
        updatedMessages.push(snapshot);
      });
      setMessages(updatedMessages);
      setLoading(false);
    });
    setTimeout( () => {
          setLoading(false);
        },2000)
    if (user) {
      setCurrentUserID(user.email);
    }

    return () => unsubscribe(); // This is important to unsubscribe when the component unmounts
  }, [user]);

  const handleDeleteMessage = async (messageId: string) => {
    // Ask the user for confirmation before deleting
    const isConfirmed = window.confirm("Are you sure you want to delete this message?");
  
    if (isConfirmed) {
      const messageRef = doc(db, 'messages', messageId);
      try {
        await deleteDoc(messageRef);
        console.log("Message deleted successfully");
      } catch (error) {
        console.error("Error deleting message: ", error);
      }
    } else {
      console.log("Message deletion cancelled");
    }
  };
  
  return (
    <div className="w-full">
      {loading ? 
        <div className="h-screen flex flex-col items-center justify-center p-5"> 
          <h1 className="uppercase text-xl font-bold text-black p-5">Loading Messages</h1>
          <Box sx={{ display: 'flex'}}>
                <CircularProgress />
            </Box>
        </div>
      : (
        <div className="flex flex-col w-full h-screen overflow-y-auto mt-8 ">
          {messages.map((message) => {
            const isCurrentUser = message.data().name === currentUserID;
            return (
              <div 
                key={message.id}
                className={`flex ${isCurrentUser ? 'justify-end m-12' : 'justify-start m-12'} my-2`}
              >
                <div className={`border-2 p-2 rounded-lg ${isCurrentUser ? 'bg-blue-500' : 'bg-gray-200'} max-w-md`}>
                  <div className='flex items-center'>
                    {message.data().photoURL ? (
                      <img className="h-5 w-5 rounded-full" src={message.data().photoURL} alt="" />
                    ) : (
                      <AccountCircleIcon />
                    )}
                    <span className='ml-2 font-medium'>{message.data().name}</span>
                  </div>
                  <p className='mt-1'>{message.data().text}</p>
                  {isCurrentUser && (
                      
                    <div className="icon-container">
                      <DeleteForeverIcon
                        onClick={() => handleDeleteMessage(message.id)}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
            <SendCommunityMessage/>
        </div>
      )}
    </div>
  );
}
export default Chat