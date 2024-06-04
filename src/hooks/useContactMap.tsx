import { ReactNode, useEffect } from "react";

declare global {
  interface Window {
    Microsoft?: any;
  }
}

declare const Microsoft: any;

const useContactMap = (_: ReactNode) => {
  useEffect(() => {
    // document.body.appendChild(script);

    if (window.Microsoft) {
      var map = new Microsoft.Maps.Map("#myMap", {});
      map.setView({
        center: new Microsoft.Maps.Location(51.5074, -0.1278),
      });
      var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), {
        icon: "https://www.bingmapsportal.com/Content/images/poi_custom.png",
        anchor: new Microsoft.Maps.Point(12, 39),
        text: "🏢",
        textOffset: new Microsoft.Maps.Point(0, 5),
      });
      map.entities.push(pushpin);
    }
  }, []);
};

export default useContactMap;
