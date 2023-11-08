import { Button, Input } from '@mui/material'
import React, { useState } from 'react'
 import { Firestore, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const SendCommunityMessage = () => {
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');
    async function sendMessage(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // get the current timestamp
        const timestamp = Date.now().toString();

        const data = {
            text: message,
        };

        try {
            //add the Document
            const messages = doc(collection(db, 'messages'), timestamp);
            await setDoc(messages, data);
            //show a success message
            setMessage('Message added successfully');
            //reset fields
            setMessage('');
        } catch (error) {
            //show an error message
            setError("An error occurred while adding message");
        }
    }
  return (
    <div>
        <form onSubmit={sendMessage}>
            <Input value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Enter message here..."/>
            <Button type="submit">send</Button>
        </form>
    </div>
  )
}

export default SendCommunityMessage