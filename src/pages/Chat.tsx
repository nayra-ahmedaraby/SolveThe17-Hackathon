import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SendHorizontal, Sparkles } from 'lucide-react';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm your AI learning assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Prepare messages for the API (convert to OpenAI format)
    const apiMessages = [
      { role: 'system', content: "You are a helpful AI assistant for kids. Explain things simply." },
      ...[...messages, userMessage].map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }))
    ];

    try {
      const response = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      });
      const data = await response.json();
      const aiReply = data.choices?.[0]?.message?.content || 'Sorry, I could not answer that.';
      const botMessage: Message = {
        id: Date.now().toString() + '-bot',
        text: aiReply,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const botMessage: Message = {
        id: Date.now().toString() + '-bot',
        text: 'Sorry, there was an error contacting the AI.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const containerStyle = {
    backgroundColor: '#F8F9FE',
    minHeight: 'calc(100vh - 80px)',
    padding: '20px'
  };

  const chatContainerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    flexDirection: 'column' as const,
    height: 'calc(100vh - 120px)'
  };

  const headerStyle = {
    backgroundColor: '#0077D8',
    color: 'white',
    padding: '16px',
    display: 'flex',
    alignItems: 'center'
  };

  const messageContainerStyle = {
    flex: 1,
    overflowY: 'auto' as const,
    padding: '16px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
  };

  const userMessageStyle = {
    alignSelf: 'flex-end',
    backgroundColor: '#0077D8',
    color: 'white',
    padding: '12px 16px',
    borderRadius: '16px 16px 0 16px',
    maxWidth: '70%'
  };

  const botMessageStyle = {
    alignSelf: 'flex-start',
    backgroundColor: '#E6F1F8',
    color: '#333',
    padding: '12px 16px',
    borderRadius: '16px 16px 16px 0',
    maxWidth: '70%'
  };

  const inputContainerStyle = {
    borderTop: '1px solid #EAEAEA',
    padding: '16px',
    backgroundColor: 'white'
  };

  const inputStyle = {
    display: 'flex',
    backgroundColor: '#F6F6F6',
    borderRadius: '100px',
    overflow: 'hidden',
    border: '1px solid #EAEAEA'
  };

  const typingIndicatorStyle = {
    fontSize: '14px',
    color: '#888',
    padding: '0 16px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  return (
    <div style={containerStyle}>
        <motion.div 
        style={chatContainerStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Chat header */}
        <div style={headerStyle}>
          <Avatar expression="happy" size="sm" style={{ marginRight: '16px' }} />
              <div>
            <h2 style={{ fontWeight: 'bold', margin: 0, fontSize: '16px' }}>AI Learning Assistant</h2>
            <p style={{ fontSize: '12px', margin: '4px 0 0', opacity: 0.8 }}>Ask me anything about your lessons!</p>
            </div>
          </div>
          
          {/* Chat messages */}
        <div style={messageContainerStyle}>
            {messages.map((message) => (
              <motion.div 
                key={message.id}
              style={{ alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start' }}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              >
              {message.sender === 'bot' && (
                <div style={{ display: 'flex', marginBottom: '8px', alignItems: 'center' }}>
                  <Avatar expression="happy" size="xs" style={{ marginRight: '10px' }} />
                  <span style={{ fontSize: '12px', color: '#666' }}>AI Assistant</span>
                </div>
              )}
              <div style={message.sender === 'user' ? userMessageStyle : botMessageStyle}>
                {message.text}
              </div>
              <div style={{ 
                fontSize: '10px', 
                color: '#999', 
                marginTop: '4px', 
                textAlign: message.sender === 'user' ? 'right' : 'left',
                padding: '0 4px'
              }}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </motion.div>
            ))}
          
          {isTyping && (
            <motion.div 
              style={{ ...botMessageStyle, padding: '8px 16px' }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0077D8', 
                  animation: 'bounce 1.4s infinite ease-in-out' }}></div>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0077D8', 
                  animation: 'bounce 1.4s infinite ease-in-out 0.2s' }}></div>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0077D8', 
                  animation: 'bounce 1.4s infinite ease-in-out 0.4s' }}></div>
              </div>
            </motion.div>
          )}
          </div>
          
          {/* Chat input */}
        <div style={inputContainerStyle}>
          <div style={typingIndicatorStyle}>
            {isTyping && (
              <>
                <Sparkles size={16} style={{ color: '#0077D8' }} />
                <span>AI is thinking...</span>
              </>
            )}
          </div>
          <div style={inputStyle}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              style={{ 
                flex: 1, 
                padding: '14px 20px', 
                border: 'none', 
                outline: 'none',
                backgroundColor: 'transparent',
                fontSize: '14px'
              }}
              />
            <Button
              variant="primary"
              icon={<SendHorizontal size={18} />}
                onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              style={{ 
                borderRadius: '0 100px 100px 0', 
                padding: '12px 20px',
                margin: '0',
                backgroundColor: '#0077D8'
              }}
              >
              Send
            </Button>
            </div>
          </div>
        </motion.div>
      
      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
};

export default Chat;