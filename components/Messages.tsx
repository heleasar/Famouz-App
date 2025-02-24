import React, { useState, useEffect, useRef } from "react";

const Messages: React.FC<{ userEmail: string }> = ({ userEmail }) => {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prev) => [...prev, { user: userEmail, text: newMessage.trim() }]);
      setNewMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents newline
      handleSendMessage();
    }
  };

  useEffect(() => {
    // Autofocus the input field when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-2 overflow-y-auto border p-2 rounded bg-transparent">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className="p-2 bg-transparent border rounded shadow-sm text-gray-700"
            >
              <span className="font-bold ">{msg.user}: </span>
              {msg.text}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No messages yet. Start the conversation!</p>
        )}
      </div>
      <div className="sticky bottom-0 flex space-x-2 border-t border-gray-300 p-2 bg-transparent">
        <input
          ref={inputRef} // Attach the ref for autofocus
          type="text"
          placeholder="Type a message"
          className="flex-1 p-2 bg-transparent border rounded outline-none "
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="px-4 py-2 bg-transparent  rounded hover:bg-blue-600"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Messages;
