import BarChart from "@/components/charts/BarChart";


const UsageSummary = () => {
    const data = {
        labels: ["Electricity", "Gas"], // X-axis labels
        datasets: [
          {
            label: "Demand", 
            data: [789, 934], 
            backgroundColor: " rgba(54, 162, 235)", 
            yAxisID: "y", 
          },
          {
            label: "Charges", 
            data: [251.72, 731.47], 
            backgroundColor: "rgba(255, 206, 86) ", 
            yAxisID: "y1", // Attach to the secondary y-axis
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
            text: "Current Usage Summary",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Energy Source", 
            },
            grid: {
              display: false, 
            },
          },
          y: {
            title: {
              display: true,
              text: "Demand", 
            },
            grid: {
              display: false, 
            },
            min: 0, 
            max: 1000, 
          },
          y1: {
            type: "linear",
            position: "right",
            title: {
              display: true,
              text: "Charges (€)", 
            },
            grid: {
              drawOnChartArea: false, 
            },
            min: 0, 
            max: 800, 
          },
        },
      };
      

  return (
    <div className="h-[400px] w-[90%]" >
      <BarChart data={data} options={options} />
    </div>
  );
};

export default UsageSummary;
