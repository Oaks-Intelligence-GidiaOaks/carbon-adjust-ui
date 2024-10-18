import { useEffect } from "react";
import * as atlas from "azure-maps-control"; // Import Azure Maps SDK
import "azure-maps-control/dist/atlas.min.css";

const TransportMap: React.FC<{ positions: any[] }> = ({ positions }) => {
  useEffect(() => {
    // Initialize the map after the component has mounted
    const map = new atlas.Map("azureMapContainer", {
      center:
        positions.length > 0 && positions[0].position.length === 2
          ? [positions[0].position[0], positions[0].position[1]]
          : [51.5549, -0.1084],
      zoom: 12, // Initial zoom level
      authOptions: {
        authType: atlas.AuthenticationType.subscriptionKey,
        subscriptionKey: import.meta.env.VITE_AZURE_KEY,
      },
      interactionOptions: {
        zoomScrollInteraction: false, // Disable scroll zoom interaction here
      },
    });

    map.events.add("ready", () => {
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

      // Create a LineString connecting all positions
      const lineCoords = positions.map((pos) => [
        pos.position[0],
        pos.position[1],
      ]);

      const line = new atlas.data.LineString(lineCoords);
      const lineDataSource = new atlas.source.DataSource();
      lineDataSource.add(new atlas.data.Feature(line));
      map.sources.add(lineDataSource);

      // Add a Line Layer to display the line on the map
      map.layers.add(
        // @ts-ignore
        new atlas.layer.LineLayer(lineDataSource, null, {
          strokeColor: "dodgerblue", // Color of the line
          strokeWidth: 2, // Line width
        })
      );

      // Create an arrow icon from the built-in template
      map.imageSprite
        .createFromTemplate("arrow-icon", "triangle-arrow-up", "blue", "blue")
        .then(() => {
          // Calculate the end point of the line
          const lastPos = positions[positions.length - 1].position;
          const secondLastPos = positions[positions.length - 2].position;

          // Calculate the heading for the arrow rotation
          const pixels = atlas.math.mercatorPositionsToPixels(
            [secondLastPos, lastPos],
            20
          );
          const heading = atlas.Pixel.getHeading(pixels[0], pixels[1]);

          // Add the arrow at the end of the path
          const arrowDataSource = new atlas.source.DataSource();
          arrowDataSource.add(
            new atlas.data.Feature(new atlas.data.Point(lastPos), { heading })
          );
          map.sources.add(arrowDataSource);

          // Add a SymbolLayer to display the arrow on the map
          map.layers.add(
            // @ts-ignore
            new atlas.layer.SymbolLayer(arrowDataSource, null, {
              iconOptions: {
                image: "arrow-icon", // Reference the custom arrow icon
                rotation: ["get", "heading"], // Rotate the icon based on the calculated heading
                anchor: "top", // Align the arrow with the end of the line
                size: 0.7, // Scale the size of the icon
              },
              filter: ["==", ["geometry-type"], "Point"], // Only render point data
            })
          );
        });
    });

    map.controls.add(new atlas.control.ZoomControl(), {
      position: atlas.ControlPosition.TopRight,
    });

    return () => {
      map.dispose(); // Clean up the map instance on unmount
    };
  }, [positions]);

  return (
    <div
      id="azureMapContainer"
      className="w-full h-[400px] my-10 overflow-x-scroll relative"
    ></div>
  );
};

export default TransportMap;
