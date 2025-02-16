import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const socket = io("http://localhost:5400"); // ✅ เปลี่ยนเป็น URL ของ Backend WebSocket Server

const Chat = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [isNameSet, setIsNameSet] = useState(false); // ✅ เช็คว่าได้ตั้งชื่อแล้วหรือยัง
  const messageEndRef = useRef(null);

  useEffect(() => {
    socket.on("chatMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("chatMessage");
    };
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() && isNameSet) { // ✅ ต้องตั้งชื่อก่อนถึงจะส่งข้อความได้
      const fullMessage = { sender: username, text: message };
      socket.emit("chatMessage", fullMessage);
      setMessage("");
    }
  };

  const handleSetName = () => {
    if (username.trim().length >= 2) { // ✅ ป้องกันไม่ให้ตั้งชื่อเป็นค่าว่าง
      setIsNameSet(true);
    } else {
      alert("🚨 กรุณากรอกชื่อให้ยาวกว่า 1 ตัวอักษร!");
    }
  };

  return (
    <div
      className={`w-screen h-screen flex flex-col items-center p-6 transition-colors duration-300 
                  ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
    >
      <h1 className="text-3xl font-bold mb-4">
        💬 <span className={darkMode ? "text-yellow-400" : "text-blue-500"}>Real-Time Chat</span>
      </h1>

      {/* Input Username */}
      {!isNameSet ? ( // ✅ แสดงช่องให้ตั้งชื่อก่อนเข้าสู่ห้องแชท
        <div className="mb-4 flex flex-col items-center gap-3">
          <input
            type="text"
            placeholder="Enter your name..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-64 p-3 rounded-md border focus:outline-none text-center
                        ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
          />
          <button
            onClick={handleSetName}
            className={`px-6 py-3 rounded-md text-lg font-semibold transition-colors 
                        ${darkMode ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
          >
            ✅ Set Name
          </button>
        </div>
      ) : (
        <>
          {/* Chat Box */}
          <div
            className={`w-full max-w-lg p-4 shadow-lg rounded-lg overflow-y-auto h-96 transition-colors 
                        ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
          >
            {messages.map((msg, index) => {
              const isMyMessage = msg.sender === username;
              return (
                <div
                  key={index}
                  className={`mb-2 p-3 rounded-lg flex flex-col max-w-xs 
                              ${isMyMessage ? "ml-auto text-right bg-blue-500 text-white" : "mr-auto text-left bg-gray-300 text-black"}
                              ${darkMode ? (isMyMessage ? "bg-blue-400" : "bg-gray-700 text-white") : ""}`}
                >
                  <span className="font-semibold">{msg.sender}</span>
                  <span>{msg.text}</span>
                </div>
              );
            })}
            <div ref={messageEndRef} />
          </div>

          {/* Chat Input */}
          <div className="w-full max-w-lg mt-4 flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`flex-1 p-3 rounded-md border focus:outline-none 
                          ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className={`px-6 py-3 rounded-md text-lg font-semibold transition-colors 
                          ${darkMode ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
            >
              🚀 Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
