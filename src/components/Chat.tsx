import React, { useEffect, useState, useRef } from 'react';
import { db } from '../config/firebase';
import { collection, query, limit, onSnapshot, doc, deleteDoc, QueryDocumentSnapshot, DocumentData, orderBy} from "@firebase/firestore";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { CircularProgress, Box } from '@mui/material';
import { useAuth } from './AuthContext';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SendCommunityMessage from './SendCommunityMessage';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUserID, setCurrentUserID] = useState<string | null>(null);
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const database = collection(db, 'messages');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const dBQuery = query(database, orderBy("createdAt", "asc")); // Order by timestamp

    const unsubscribe = onSnapshot(dBQuery, (querySnapshot) => {
      const updatedMessages: QueryDocumentSnapshot<DocumentData>[] = [];

      querySnapshot.forEach((snapshot) => {
        updatedMessages.push(snapshot);
      });
      setMessages(updatedMessages);
      setLoading(false);
    });

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    if (user) {
      setCurrentUserID(user.email);
    }

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleDeleteMessage = async (messageId: string) => {
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
      {loading ? (
        <div className="h-screen flex flex-col items-center justify-center p-5">
          <h1 className="uppercase text-xl font-bold text-black p-5">Loading Messages</h1>
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        </div>
      ) : (
        <div className="flex flex-col w-full h-screen overflow-y-auto mt-8">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.data().name === currentUserID ? 'justify-end m-12' : 'justify-start m-12'} my-2`}
            >
              <div className={`border-2 p-2 rounded-lg ${message.data().name === currentUserID ? 'bg-blue-500' : 'bg-gray-200'} max-w-md`}>
                <div className='flex items-center'>
                  {message.data().photoURL ? (
                    <img className="h-5 w-5 rounded-full" src={message.data().photoURL} alt="" />
                  ) : (
                    <AccountCircleIcon />
                  )}
                  <span className='ml-2 font-medium'>{message.data().name}</span>
                </div>
                <p className='mt-1'>{message.data().text}</p>
                {message.data().name === currentUserID && (
                  <div className="icon-container">
                    <DeleteForeverIcon
                      onClick={() => handleDeleteMessage(message.id)}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
          <SendCommunityMessage />
        </div>
      )}
    </div>
  );
};

export default Chat;