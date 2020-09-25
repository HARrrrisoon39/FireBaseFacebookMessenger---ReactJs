import React, { useEffect, useState } from "react";
import Message from "./Message";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import db from "./firebase";
import "./App.css";
import firebase from "firebase";
// import SendIcon from '@material-ui/icons/Send';

function App() {
  const [input, setInput] = useState("");  
  const [messages, setMessages] = useState([
    // { username: "harry", message: "hey man" },
    // { username: "soul", text: "yoh" },
  ]);
  const [username, setUsername] = useState("");

  // console.log(input);
  // console.log(messages);

  useEffect(() => {
    db.collection("messages").orderBy('timestamp','desc').onSnapshot((snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);
  //create the collection in fire store named message 
  // then add the value 
  // message : ------
  // username : =====     

  useEffect(() => {
    setUsername(prompt("enter the name"));
  }, []);

  // const sendMessage = (event) => {
  //   event.preventDefault();
  //   setMessages([...messages, { username: username, text: input }]);
  //   setInput("");
  // };
  const sendMessage = (event) => {
    event.preventDefault();
    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // setTodos([...todos, input]);
    setInput("");
  };

  return (
    <div className="App">
      <h1>Messenger</h1>
      <h2>Hello {username}!</h2>
      <form className="app_form">
        <FormControl>
          <InputLabel className="input" >Enter Message</InputLabel>
          <Input 
            type="text"
            value={input}
            placeholder="enter"
            onChange={(event) => setInput(event.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            disabled={!input}
            onClick={sendMessage}
          >
            Send Text
          </Button>
        </FormControl>
      </form>
      {messages.map((message) => (
        <Message username={username} message={message} />
      ))}
    </div>
  );
}

export default App;
