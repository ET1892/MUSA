import React, { useEffect, useState } from 'react'
import {db} from '../config/firebase'
import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs} from "@firebase/firestore";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendCommunityMessage from './SendCommunityMessage';
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
      {loading ? <h1>Loading newest messages....</h1> : messages.map( (message, photoURL) => {
        return (
          <div key={message.id}>
            {message.data().text}
            <AccountCircleIcon/>
          </div>
        )
      })}
    </div>
  );
}
export default Chat