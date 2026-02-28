import axios from "axios";
import { useState, useEffect } from "react";
import { Doughnut, Pie, Bar } from "react-chartjs-2";
import Spinner from "../components/Spinner";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

const Reports = () => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [allTasks, setAllTasks] = useState(0);
  const [todoTasks, setTodoTasks] = useState(0);
  const [inProgressTasks, setInProgressTasks] = useState(0);
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [completedRes, allRes, todoRes, progressRes, teamRes] =
          await Promise.all([
            axios.get(`${BASE_URL}/report/completedTasks`),
            axios.get(`${BASE_URL}/report/allTasks`),
            axios.get(`${BASE_URL}/report/todoTasks`),
            axios.get(`${BASE_URL}/report/inProgressTasks`),
            axios.get(`${BASE_URL}/report/closedTasks/team`),
          ]);

        setCompletedTasks(completedRes.data.totalCompletedTasks);
        setAllTasks(allRes.data.totalTasks);
        setTodoTasks(todoRes.data.totalTodoTasks);
        setInProgressTasks(progressRes.data.totalInProgressTasks);
        setTeamData(teamRes.data);
      } catch (error) {
        console.error("Error loading reports:", error);
      }
    }

    fetchData();
  }, []);

  if (!allTasks) return <Spinner />;

  const totalVsCompletedData = {
    labels: ["Completed", "Total Tasks"],
    datasets: [
      {
        data: [completedTasks, allTasks],
        backgroundColor: ["#36A2EB", "#e78b0c"],
      },
    ],
  };

  const statusData = {
    labels: ["To Do", "In Progress", "Completed"],
    datasets: [
      {
        data: [todoTasks, inProgressTasks, completedTasks],
        backgroundColor: ["#FFCE56", "#4BC0C0", "#36A2EB"],
      },
    ],
  };

  const teamChartData = {
    labels: teamData.map((item) => item.name),
    datasets: [
      {
        label: "Tasks Closed",
        data: teamData.map((item) => item.totalClosed),
        backgroundColor: "#36A2EB",
      },
    ],
  };
  // console.log(teamData)

  return (
    <main className="OuterCon">
      <h1 className="text-start my-3">Report Overview</h1>

      <div className="container">
        <h4 className="text-center my-3">Total vs Completed</h4>
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "300px",
            margin: "auto",
          }}
        >
          <Doughnut
            data={totalVsCompletedData}
            options={{ responsive: true, maintainAspectRatio: false }}
            className="mb-3"
          />
        </div>

        <br />

        <h4 className="text-center my-3">Task Status Distribution</h4>
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "300px",
            margin: "auto",
          }}
        >
          <Pie
            data={statusData}
            options={{ responsive: true, maintainAspectRatio: false }}
            className="mb-3"
          />
        </div>

        <br />

        <div style={{ overflow: true }}>
          <h4 className="text-center my-3">Tasks Closed by Team</h4>
          <div
            style={{
              maxWidth: "400px",
              height: "300px",
              margin: "auto",
            }}
          >
            <Bar
              data={teamChartData}
              options={{ responsive: true, maintainAspectRatio: false }}
              className="mb-3"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Reports;
