import React, { useState } from "react";
import AWS from "aws-sdk";
import "./Chatbot.css";

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
    <div className="center-square ">
      <div className="square">
        <div className="w-full flex flex-col mt-96 p-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            className="border border-2 border-solid border-black w-full mt-24 rounded-md"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white w-1/3 mt-2 p-2 rounded-md ml-64"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
