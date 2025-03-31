import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = ({ token }) => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/chat', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchMessages();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/chat',
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages([...messages, res.data]);
      setContent('');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="chat-container">
      <h2>Чат</h2>
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg._id} className="message">
            <p>
              {msg.userId.name} {msg.userId.surname}: {msg.content}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Введите сообщение"
          required
        />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default Chat;