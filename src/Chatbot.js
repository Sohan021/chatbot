import React, { useState } from "react";
import AWS from "aws-sdk";

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");

  AWS.config.update({
    region: "region",
    accessKeyId: "access_key",
    secretAccessKey: "secret_key",
  });
  const lexruntime = new AWS.LexRuntime();
  const sendMessage = () => {
    console.log(userInput);
    lexruntime.postText(
      {
        botName: "BotName",
        botAlias: "BotAlias",
        userId: "unique_user_id",
        inputText: userInput,
      },
      (err, data) => {
        if (err) {
          console.error(err, err.stack);
        } else {
          console.log("Response is :", data);
        }
      }
    );
    setUserInput("");
  };

  return (
    <div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chatbot;
