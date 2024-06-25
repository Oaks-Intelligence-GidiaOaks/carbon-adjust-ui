import { useEffect } from "react";
import "amazon-connect-streams";

const AmazonConnect = () => {
  useEffect(() => {
    const containerDiv = document.getElementById("container-div")!;
    const instanceURL = "https://carbon-adjust.my.connect.aws/ccp-v2/";

    if (!document.getElementById("ccpIframe")) {
      try {
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
          region: "eu-west-2", // replace with the region where your Amazon Connect instance is hosted
          softphone: {
            allowFramedSoftphone: true,
            disableRingtone: false,
            allowFramedVideoCall: true,
            // ringtoneUrl: "./ringtone.mp3",
          },
          pageOptions: {
            // Optional, allows customization of the CCP
            enableAudioDeviceSettings: true, // Optional, default is true
            enablePhoneTypeSettings: true, // Optional, default is true
          },
          ccpAckTimeout: 5000, // Optional, number of milliseconds to wait for acknowledgment
          ccpSynTimeout: 3000, // Optional, number of milliseconds to wait for synchronization
          ccpLoadTimeout: 10000,
        });
      } catch (ex) {
        console.error("Error initialising CCP", ex);
      }
    }

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
