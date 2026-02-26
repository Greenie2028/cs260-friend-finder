import React, { useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import '../app.css';

export function Friends() {
    const [friends, setFriends] = useState([]);
    const [activeChatFriend, setActiveChatFriend] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const navigate = useNavigate();
    const messagesEndRef = useRef(null)

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');

        if (!currentUser) {
            navigate('/login');
            return;
        }

        const friendsList = JSON.parse(localStorage.getItem(`friends_${currentUser}`)) || [];
        setFriends(friendsList);
    }, []);

    function handleOpenChat(friend) {
        setActiveChatFriend(friend);

        // Adding fake messages as placeholder
        setMessages([
            { sender: friend.name, text: "Hello! It's great to meet you!"},
            { sender: 'me', text: "Hi! It's great to talk to a placeholder!"}
        ]);
    }

    function handleCloseChat() {
        setActiveChatFriend(null);
        setMessages([]);
        setInputMessage('');
    }

    function handleSendMessage() {
        if (!inputMessage.trim()) return;

        setMessages((prev) => [...prev, {sender: 'me', text: inputMessage }]);
        setInputMessage('');

        //Simulating a response
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { sender: activeChatFriend.name, text: "Sounds Great! (Disclaimer: This is a simulated response and does not accurately represent the beliefs or wishs of Levi Clements and is not legally binding in any way."}
            ]);
        }, 1000);
    }

    function handleRemoveFriend(emailToRemove) {
        const currentUser = localStorage.getItem('currentUser');

        const updatedFriends = friends.filter((friend) => friend.email !== emailToRemove);

        localStorage.setItem(`friends_${currentUser}`, JSON.stringify(updatedFriends));
        setFriends(updatedFriends);
    }

  return (
    <main>
    <h2>Your Friends</h2>
        {friends.length > 0 ? (
            <ul>
            {friends.map((friend) => (
            <li key={friend.email}>
                <strong>{friend.name}</strong> - {friend.city}
                <button className="btn btn-primary btn-sm mx-2" onClick={() => handleOpenChat(friend)}>Chat</button>
                <button className="btn btn-danger btn-sm mx-2" onClick={() => handleRemoveFriend(friend.email)}>Unfriend</button>
            </li>
            ))}
            </ul>
        ) : (
            <p>You haven't added any friends yet!</p>
        )}
        {activeChatFriend && (
            <div style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                width: '300px',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                zIndex: 1000
            }}>
                <div style={{
                    backgroundColor: "#87A0C0",
                    padding: "10px 15px",
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <strong>{activeChatFriend.name}</strong>
                    <button onClick={handleCloseChat} 
                    style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        color: 'black'
                    }}
                    >x</button>
                </div>
                <div style={{
                    padding: '10px',
                    height: '250px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    backgroundColor: '#f5f5f5'
                }}>
                    {messages.map((msg, index) => (
                      <div key={index} style={{
                        alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                        backgroundColor: msg.sender === 'me' ? '#87A0A0' : '#ddd',
                        padding: '8px 12px',
                        borderRadius: '12px',
                        maxWidth: '75%',
                        textAlign: 'left'
                      }}>
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef}/>
                </div>
                <div style={{
                    display: 'flex',
                    padding: '8px',
                    borderTop: '1px solid #ddd',
                    backgroundColor: 'white',
                    gap: '8px'
                }}>
                    <input
                    type='text'
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    style = {{
                        flex: 1,
                        borderRadius: '20px',
                        border: '1px solid #ddd',
                        padding: '6px 12px'
                    }}
                    />
                    <button className="btn btn-primary btn-sm" onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        )}
      </main>
  );
}