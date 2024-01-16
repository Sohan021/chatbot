import React, { useState, useEffect } from "react";
import "./App.css";
import { DetectDominantLanguageCommand } from "@aws-sdk/client-comprehend";
import { TranslateTextCommand } from "@aws-sdk/client-translate";
import { PostTextCommand } from "@aws-sdk/client-lex-runtime-service";
import { lexClient } from "./libs/lexClient.js";
import { translateClient } from "./libs/translateClient.js";
import { comprehendClient } from "./libs/comprehendClient.js";

function App() {
  const [gText, setGText] = useState("");
  const [wisdomText, setWisdomText] = useState("");
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    // Set the focus to the input box.
    document.getElementById("wisdom").focus();
  }, []);

  const showRequest = () => {
    setConversation((prevConversation) => [
      ...prevConversation,
      { text: gText, className: "userRequest" },
    ]);
  };

  const showResponse = (lexResponse) => {
    setConversation((prevConversation) => [
      ...prevConversation,
      { text: lexResponse, className: "lexResponse" },
    ]);
  };

  const handletext = (text) => {
    setGText(text);
    // Make your XMLHttpRequest here if needed
  };

  const loadNewItems = () => {
    showRequest();
    setWisdomText("");
  };

  const createResponse = async () => {
    if (wisdomText && wisdomText.trim().length > 0) {
      setWisdomText("hi");
      handletext("hi");

      try {
        const data = await comprehendClient.send(
          new DetectDominantLanguageCommand({ Text: wisdomText })
        );
        console.log("Success. The language code is: ", data.Languages[0].LanguageCode);

        const translateParams = {
          SourceLanguageCode: data.Languages[0].LanguageCode,
          TargetLanguageCode: "en",
          Text: wisdomText,
        };

        try {
          const translationData = await translateClient.send(
            new TranslateTextCommand(translateParams)
          );

          console.log("Success. Translated text: ", translationData.TranslatedText);

          const lexParams = {
            botName: "KazLunchSheet",
            botAlias: "TestBotAlias",
            inputText: translationData.TranslatedText,
            userId: "chatbot-6",
          };

          try {
            const lexData = await lexClient.send(new PostTextCommand(lexParams));
            console.log("Success. Response is: ", lexData.message);
            showResponse(lexData.message);
          } catch (err) {
            console.log("Error responding to message. ", err);
          }
        } catch (err) {
          console.log("Error translating text. ", err);
        }
      } catch (err) {
        console.log("Error identifying language. ", err);
      }
    }
  };

  return (
    <div className="App">
      <h1 id="title">Amazon Lex - BookTrip</h1>
      <p id="intro">
        This multiple language chatbot shows you how easy it is to incorporate
        <a
          href="https://aws.amazon.com/lex/"
          title="Amazon Lex (product)"
          target="_new"
        >
          Amazon Lex
        </a>
        into your web apps. Try it out.
      </p>
      <div id="conversation">
        {conversation.map((item, index) => (
          <p key={index} className={item.className}>
            {item.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        id="wisdom"
        size="80"
        value={wisdomText}
        onChange={(e) => setWisdomText(e.target.value)}
        placeholder="J'ai besoin d'une chambre d'hôtel"
      />
      <br />
      <button onClick={createResponse}>Send Text</button>
    </div>
  );
}

export default App;
