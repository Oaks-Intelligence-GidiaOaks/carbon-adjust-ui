import LineChart from "@/components/charts/LineChart";



const TrendingProjections = () => {
    
    const data = {
        labels: ["Short", "Medium", "Long"], // X-axis labels
        datasets: [
          {
            label: "Price Trendline",
            data: [1000, 1050, 1100], 
            lineTension: 0.2, 
            borderColor: "#FF5733", 
            backgroundColor: "rgba(255, 87, 51, 0.2)", 
            pointRadius: 5, 
          },
          {
            label: "Policy Effect Trendline",
            data: [995, 1000, 1010], 
            lineTension: 0.2,
            borderColor: "#33FF57",
            backgroundColor: "rgba(51, 255, 87, 0.2)",
            pointRadius: 5,
          },
          {
            label: "Consumption Trendline",
            data: [1700, 1750, 1780], 
            lineTension: 0.2,
            borderColor: "#3357FF",
            backgroundColor: "rgba(51, 87, 255, 0.2)",
            pointRadius: 5,
            yAxisID: "y1", 
          },
        ],
      };
      
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              boxWidth: 10, 
            },
          },
          title: {
            display: true,
            text: "Trending Projections",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Term",
            },
            grid: {
              display: false, 
            },
          },
          y: {
            title: {
              display: true,
              text: "Value",
            },
            grid: {
              display: true, // Show gridlines
            },
            min: 950, // Minimum value
            max: 1150, // Maximum value
          },
          y1: {
            type: "linear", // Second y-axis for consumption
            position: "right",
            title: {
              display: true,
              text: "Consumption Trendline",
            },
            grid: {
              drawOnChartArea: false, // Don't draw grid lines on this axis
            },
            min: 1700, // Minimum value for consumption
            max: 1900, // Maximum value for consumption
          },
        },
      };

// // Function to download chart as an image
//   const downloadChart = () => {
//     const link = document.createElement("a");
//     link.href = chartRef.current.toDataURL("image/png"); // Convert canvas to image
//     link.download = "chart.png"; // Set the download file name
//     link.click(); // Trigger the download
//   };
      

  return (
    <div className="h-[400px] w-[90%]"> 
      <LineChart data={data} options={options} />
    </div>
  );
};

export default TrendingProjections;
