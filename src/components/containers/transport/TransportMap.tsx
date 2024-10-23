import { useEffect } from "react";
import * as atlas from "azure-maps-control"; // Import Azure Maps SDK
import "azure-maps-control/dist/atlas.min.css";
import axios from "axios"; // For making API requests

const TransportMap: React.FC<{ positions: any[] }> = ({ positions }) => {
  useEffect(() => {
    // Initialize the map
    const map = new atlas.Map("azureMapContainer", {
      center: [0, 0],
      zoom: 0, // Default zoom level
      authOptions: {
        authType: atlas.AuthenticationType.subscriptionKey,
        subscriptionKey: import.meta.env.VITE_AZURE_KEY,
      },
      interactionOptions: {
        zoomScrollInteraction: false,
      },
    });

    map.events.add("ready", () => {
      if (positions.length > 1) {
        // Use the first and last position as the start and end points for the route
        const start = positions[0].position;
        const end = positions[positions.length - 1].position;

        // Construct the Route API URL
        const routeApiUrl = `https://atlas.microsoft.com/route/directions/json?api-version=1.0&query=${
          start[1]
        },${start[0]}:${end[1]},${end[0]}&subscription-key=${
          import.meta.env.VITE_AZURE_KEY
        }`;

        // Fetch route data from the Azure Maps Route API
        axios
          .get(routeApiUrl)
          .then((response) => {
            // Extract route coordinates from the API response
            const routeCoordinates = response.data.routes[0].legs[0].points.map(
              (point: any) => [point.longitude, point.latitude]
            );

            // Draw the route on the map
            const routeLine = new atlas.data.LineString(routeCoordinates);
            const routeDataSource = new atlas.source.DataSource();
            routeDataSource.add(new atlas.data.Feature(routeLine));
            map.sources.add(routeDataSource);

            // Add a Line Layer to display the route
            map.layers.add(
              // @ts-ignore
              new atlas.layer.LineLayer(routeDataSource, null, {
                strokeColor: "dodgerblue",
                strokeWidth: 3,
              })
            );

            // Center and adjust the zoom based on the route
            const bounds =
              atlas.data.BoundingBox.fromPositions(routeCoordinates);
            map.setCamera({ bounds, padding: 50 });
          })
          .catch((error) => {
            console.error("Error fetching route data:", error);
          });

        // Add markers and popups for each position
        positions.forEach((pos) => {
          const marker = new atlas.HtmlMarker({
            color: "dodgerblue",
            text: pos.text,
            position: [pos.position[0], pos.position[1]],
          });

          const popup = new atlas.Popup({
            content: `<div class="p-5 text-sm">${pos.name}<br>${pos.address}</div>`,
            pixelOffset: [0, -30],
          });

          map.events.add("click", marker, () => {
            popup.setOptions({
              position: [pos.position[0], pos.position[1]],
            });
            popup.open(map);
          });

          map.markers.add(marker);
          map.popups.add(popup);
        });
      }
    });

    return () => {
      map.dispose();
    };
  }, [positions]);

  return (
    <div
      id="azureMapContainer"
      className="w-full h-[400px] my-10 relative"
    ></div>
  );
};

export default TransportMap;
