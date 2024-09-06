// Inject Chart.js library
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/chart.js";
document.head.appendChild(script);

// Initialize chart
function initChart(data, ctx) {
  const labels = data.map((row) => formatDate(new Date(row.date)));
  const openPrices = data.map((row) => row.open);
  const closePrices = data.map((row) => row.close);

  return new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Opening Prices",
          data: openPrices,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Closing Prices",
          data: closePrices,
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
}

// Initialize WebSocket
function initWebSocket(chart) {
  const socket = new WebSocket(`ws://localhost:3000`);

  socket.onmessage = (event) => {
    const updatedData = JSON.parse(event.data);
    const formattedDate = formatDate(new Date(updatedData.date));

    if (chart.data.labels.includes(formattedDate)) {
      const index = chart.data.labels.indexOf(formattedDate);
      chart.data.datasets[0].data[index] = updatedData.open;
      chart.data.datasets[1].data[index] = updatedData.close;
    } else {
      chart.data.labels.push(formattedDate);
      chart.data.datasets[0].data.push(updatedData.open);
      chart.data.datasets[1].data.push(updatedData.close);
    }
    chart.update();
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };
}

// Format date
function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}

// Main function
async function main() {
  const ctx = document.getElementById("rtchart").getContext("2d");

  try {
    const response = await fetch("http://localhost:3000/embedded");
    const data = await response.json();
    const chart = initChart(data, ctx);
    initWebSocket(chart);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run main function when DOM is loaded
script.onload = function () {
  document.addEventListener("DOMContentLoaded", main);
};
