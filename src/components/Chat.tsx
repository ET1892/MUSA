import React, { useEffect, useState } from 'react'
import {db} from '../config/firebase'
import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs} from "@firebase/firestore";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {CircularProgress, Box} from '@mui/material';
const Chat = () => {
  const [messages, setMessages] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

  const database = collection(db, 'messages');
  const [loading,setLoading] = useState<boolean>(true);

  const getData = async () => {

    // const dBQuery= query(database, limit(10), where('room', '==', 'general'));
    const dBQuery= query(database, limit(10));
    const querySnapshot = await getDocs(dBQuery);
    const result: QueryDocumentSnapshot<DocumentData>[] = [];
    querySnapshot.forEach((snapshot) => {
      result.push(snapshot);
    });
    setMessages(result);
  }

  useEffect( () => {
    getData();
    // reset loading
    setTimeout( () => {
      setLoading(false);
    },2000)
 },[]);

  return (
    <div>
      {loading ? 
      <div className="h-screen flex flex-col items-center justify-center p-5"> 
      <h1 className="uppercase text-xl font-bold text-black p-5">Loading Messages</h1>
      <Box sx={{ display: 'flex'}}>
          <CircularProgress />
      </Box>
      </div>
      : messages.map( (message) => {
        return (
          <div className="border-2 border-color: black "key={message.id}>
            <div className='flex'>
              {message.data().photoURL ? ( //if image exists load it else load default icon
              <img className="h-5" src={message.data().photoURL}></img> //ignore the alt tag its being replaced with a default icon
              ) : (
                <AccountCircleIcon />
            )} 
              {message.data().name}
            </div> 
            <br />
            <div>
              {message.data().text}
            </div>
          </div>
        )
      })}
    </div>
  );
}
export default Chat