import '/node_modules/@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
MainContainer,
ChatContainer,
MessageList,
Message,
MessageInput,
} from "@chatscope/chat-ui-kit-react";
import React from 'react';

export default function Chat() {

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const [messages, setMessages] = React.useState([
        { message: "Hello my friend", sentTime: timeString, sender: "Joe" },
    ])

    const handleSend = (text) => {
        if (!text) return;
        const newMessage = { message: text, sentTime: timeString, sender: "You" };
      setMessages([...messages, newMessage]);
    }

    return (
    <div style={{ position: "relative", height: "500px" }}>
      <MainContainer>
        <ChatContainer>
        <MessageList>
            {messages.map((msg, index) => (
                <Message
                key={index}
                model={{
                    message: `${msg.sentTime} | ${msg.sender}: ${msg.message}`,
                    direction: msg.sender === "You" ? "outgoing" : "incoming",
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

