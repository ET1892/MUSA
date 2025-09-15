import React, { useEffect, useState, useRef } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { CircularProgress, Box } from '@mui/material';

interface Message {
  id: string;
  name: string;
  text: string;
  photoURL?: string;
}

const conversation: Message[] = [
  { id: "1", name: "Alice", text: "Hey guys, did you see today's APOD? The Orion Nebula looks incredible!" },
  { id: "2", name: "Bob", text: "Yes! I love how vibrant the colors are. NASA really nailed it." },
  { id: "3", name: "Charlie", text: "I bookmarked it already. The detail in the gas clouds is insane!" },
  { id: "4", name: "Alice", text: "Also saw the Mars rover photos. The surface looks so rugged and red." },
  { id: "5", name: "Bob", text: "Mars' Olympus Mons looks huge in the new images." },
  { id: "6", name: "Charlie", text: "Absolutely, and the dust storms they capture are crazy!" },
  { id: "7", name: "Alice", text: "Did anyone check out the Saturn rings image from last week?" },
  { id: "8", name: "Bob", text: "Yes, that one was stunning. The rings are so detailed." },
  { id: "9", name: "Charlie", text: "I’m obsessed with the lunar eclipse pics too." },
  { id: "10", name: "Alice", text: "The Jupiter storm photo from APOD is epic, just like a painting!" },
  { id: "11", name: "Bob", text: "I love how NASA captures these moments. Makes space feel alive." },
  { id: "12", name: "Charlie", text: "Totally. Every new image feels like a conversation with the universe." },
];

const dummyUsers = [
  { name: "Alice", photoURL: "" },
  { name: "Bob", photoURL: "" },
  { name: "Charlie", photoURL: "" },
];

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Load the hardcoded conversation
  useEffect(() => {
    setTimeout(() => {
      setMessages(conversation);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleDeleteMessage = (messageId: string) => {
    if (!messages) return;
    const filtered = messages.filter((msg) => msg.id !== messageId);
    setMessages(filtered);
  };

  return (
    <div className="w-full">
      {loading || !messages ? (
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
              className={`flex ${
                message.name === "Alice" ? "justify-end m-12" : "justify-start m-12"
              } my-2`}
            >
              <div
                className={`border-2 p-2 rounded-lg ${
                  message.name === "Alice" ? "bg-blue-500" :
                  message.name === "Bob" ? "bg-green-400" : "bg-gray-200"
                } max-w-md`}
              >
                <div className="flex items-center">
                  {message.photoURL ? (
                    <img className="h-5 w-5 rounded-full" src={message.photoURL} alt="" />
                  ) : (
                    <AccountCircleIcon />
                  )}
                  <span className="ml-2 font-medium">{message.name}</span>
                </div>
                <p className="mt-1">{message.text}</p>
                {message.name === "Alice" && (
                  <div className="icon-container">
                    <DeleteForeverIcon
                      onClick={() => handleDeleteMessage(message.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default Chat;
