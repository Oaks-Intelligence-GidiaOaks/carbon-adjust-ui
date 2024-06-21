import React, { useEffect } from "react";
import "amazon-connect-streams";

const AmazonConnect = () => {
  useEffect(() => {
    const containerDiv = document.getElementById("container-div");
    const instanceURL =
      "https://idysman-test-call-center.my.connect.aws/ccp-v2";

    connect.core.initCCP(containerDiv, {
      ccpUrl: instanceURL,
      loginPopup: true,
      loginPopupAutoClose: true,
      loginOptions: {
        autoClose: true,
        height: 600,
        width: 400,
        top: 0,
        left: 0,
      },
      region: "us-west-2", // replace with the region where your Amazon Connect instance is hosted
      softphone: {
        allowFramedSoftphone: true,
        disableRingtone: false,
        ringtoneUrl: "./ringtone.mp3",
      },
    });

    connect.agent((agent) => {
      agent.onStateChange((state) => {
        console.log(`Agent state changed to: ${state.newState}`);
      });
    });
  }, []);

  return (
    <div>
      <h1>Amazon Connect Integration</h1>
      <div id="container-div" style={{ width: "400px", height: "600px" }}></div>
    </div>
  );
};

export default AmazonConnect;
