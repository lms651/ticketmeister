import '/node_modules/@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { useEffect, useState, useRef } from 'react';
import { io } from "socket.io-client";

export default function Chat({ eventId, userName }) {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io("http://localhost:5000");

    // join room for event
    socketRef.current.emit("joinRoom", eventId, userName);

    // listen for messages
    socketRef.current.on("chat message", (msg) => {
      setMessages(prev => [...prev, msg]);
    })

    // cleanup on unmount
    return () => socketRef.current.disconnect();
  }, [eventId, userName]);

  const handleSend = (text) => {
    if (!text) return;
    socketRef.current.emit("chat message", {
      venueId: eventId,
      userName,
      msg: text,
    })
  }

  return (
    <div style={{ position: "relative", height: "500px" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {messages.map((msg, i) => (
              <Message
                key={i}
                model={{
                  message: `${msg.sentTime} | ${msg.sender}: ${msg.message}`,
                  direction: msg.sender === userName ? "outgoing" : "incoming",
                }}
              />
            ))}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  )
}
