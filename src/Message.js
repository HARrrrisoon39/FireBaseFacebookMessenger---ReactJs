import React from "react";

import "./Message.css";

function Message({ message, username }) {
  const isUser = username === message.username;
  return (
    <div className={`message1 ${isUser && "message_user"}`}>
      <div className={isUser ? "message_userCard": "message_guestcard"}>
        <h2>
          {message.username}: {message.message}
        </h2>
      </div>
    </div>
  );
}

export default Message;
