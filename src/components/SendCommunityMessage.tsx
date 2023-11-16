import { Button, Input } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Firestore, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from './AuthContext';
import { match } from 'assert';

import badWordsList from '../config/en.json'; //bad words list



const SendCommunityMessage = () => {

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { user } = useAuth();
    const [badWords, setBadWords] = useState<Set<string>>(new Set());
    useEffect(() => {
        // Flatten the bad words list
        const flattenedBadWords = badWordsList.flatMap(word => word.match.toLowerCase().split('|'));
        setBadWords(new Set(flattenedBadWords));
    }, []);



    async function sendMessage(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Check if the message is empty
        if (!message.trim()) {
            setError("Message cannot be empty");
            return;
        }

        // Check for bad words
        const messageWords = message.toLowerCase().split(' ');
        const containsBadWord = messageWords.some(word => badWords.has(word));
        if (containsBadWord) {
            setError("Please avoid using bad language");
            return;
        }
        // badWords.forEach(word => {console.log(word)});

        
        // If checks pass, proceed with sending message
        const timestamp = serverTimestamp();
        const data = {
            text: message,
            name: user?.email,
            photoURL: user?.photoURL,
            createdAt: timestamp,
        };

        try {
            const messages = doc(collection(db, 'messages'));
            await setDoc(messages, data);
            // Reset message input after successful send
            setMessage('');
        } catch (error) {
            setError("An error occurred while adding message");
        }

        
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={sendMessage} className="flex flex-col gap-4">
                <Input
                    className=" w-80 h-12 text-lg p-2 border border-gray-300 rounded-md"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder="Enter message here..."
                    error={Boolean(error)}
                    sx={{color: 'white'}}
                />
                <Button
                    className="w-full h-14 text-lg bg-blue-800 text-white rounded-md hover:bg-blue-700"
                    type="submit"
                >
                    Send
                </Button>
                {error && <p className="text-red-500 text-center">{error}</p>}
            </form>
        </div>
    );
};

export default SendCommunityMessage;
