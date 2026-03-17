import React, { useState, useRef, useEffect } from "react";
import { getChatResponse } from "../utils/gemini";
import "./styles/Chatbot.css";
import { MdChat, MdClose, MdSend } from "react-icons/md";

interface Message {
  role: "user" | "model";
  parts: { text: string }[];
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { role: "user", parts: [{ text: input }] };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const response = await getChatResponse(input, messages);
    
    const botMsg: Message = { role: "model", parts: [{ text: response }] };
    setMessages((prev) => [...prev, botMsg]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className={`chatbot-container ${isOpen ? "open" : ""}`} data-cursor="disable">
      {!isOpen && (
        <button className="chat-toggle" onClick={() => setIsOpen(true)} aria-label="Open Chat">
          <MdChat size={30} />
        </button>
      )}

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Nexus</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <MdClose size={24} />
            </button>
          </div>
          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="welcome-msg">
                Hello! I'm Nexus, Lakshit's AI assistant. Ask me anything about his work, skills, or projects!
              </div>
            )}
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                <div className="message-content">
                  {msg.parts[0].text}
                </div>
              </div>
            ))}
            {isTyping && (
                <div className="message model typing">
                    <div className="message-content">Thinking...</div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me something..."
              disabled={isTyping}
            />
            <button onClick={handleSend} disabled={isTyping || !input.trim()}>
              <MdSend size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
