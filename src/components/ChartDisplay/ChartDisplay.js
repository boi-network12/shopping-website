import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, // Enables gradient fill
} from "chart.js";
import "./ChartDisplay.css";
import { MatrixContext } from "../../context/MatrixContext";

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const ChartDisplay = () => {
  const { dailyMetrics, recentOrders } = useContext(MatrixContext);

  // Create a gradient for the line chart
  const chartRef = React.useRef(null);

  const getGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "rgba(75,192,192,0.6)");
    gradient.addColorStop(1, "rgba(75,192,192,0)");
    return gradient;
  };

  const data = {
    labels: dailyMetrics.map((metric) => new Date(metric.date).toLocaleDateString()),
    datasets: [
      {
        label: "Daily Revenue",
        data: dailyMetrics.map((metric) => metric.totalRevenue),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: chartRef.current ? getGradient(chartRef.current.ctx) : "rgba(75,192,192,0.2)",
        fill: true,
        tension: 0.4, // Smooth curve
        pointRadius: 5,
        pointBackgroundColor: "#fff",
        pointBorderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: "easeInOutQuart",
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#333",
        bodyColor: "#555",
        borderWidth: 1,
        borderColor: "#ccc",
        boxPadding: 10,
      },
      title: {
        display: true,
        text: "Daily Revenue Trends",
        font: {
          size: 18,
          weight: "bold",
        },
        color: "#333",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#555",
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
          borderDash: [5, 5], // Dashed grid lines
        },
        ticks: {
          color: "#555",
          callback: (value) => `₦${value.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div className="ChartDisplayWrapper">
      <div className="Line-chartBox">
        <Line ref={chartRef} data={data} options={options} />
      </div>
      <div className="RecentOrders">
        <h2>Recent Orders</h2>
        <ul>
          {recentOrders.slice(0, 4).map((order) => (
            <li key={order._id}>
              <span className="order-email">{order.user.email}</span>
              <span className="order-amount">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(order.totalAmount)}
              </span>
              <span className={`order-status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </li>
          ))}
        </ul>
        <p className="view-all">Click the order in side bar to view all</p>
      </div>
    </div>
  );
};

export default ChartDisplay;
