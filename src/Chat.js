import React, { Component, useEffect } from "react";

const Chat = () => {
  const mountChatbot = () => {
    (function (d, m) {
      var kommunicateSettings = {
        appId: "eaae433aac9569b274324938d2ebca1f",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  };

  useEffect(() => {
    mountChatbot();
  }, []);

  return <div></div>;
};

export default Chat;
