/* eslint-disable react-refresh/only-export-components */
import { useContext, createContext, useEffect, useState } from "react";
import axios from "axios";
const DataContext = createContext();
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useDataContext = () => useContext(DataContext);

export function DataProvider({ children }) {
  const [projectLoading, setProjectLoading] = useState(false);
  const [projectError, setProjectError] = useState(null);
  const [projects, setProjects] = useState([]);

  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState(null);
  const [users, setUsers] = useState([]);

  const [teamLoading, setTeamLoading] = useState(false);
  const [teamError, setTeamError] = useState(null);
  const [teams, setTeams] = useState([]);

  const [taskLoading, setTaskLoading] = useState(false);
  const [taskError, setTaskError] = useState(null);
  const [tasks, setTasks] = useState([]);

  async function fetchProjects() {
    try {
      setProjectLoading(true);
      setProjectError(null);

      const token = localStorage.getItem("userToken");

      const res = await axios.get(`${BASE_URL}/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(res.data);
    } catch (error) {
      console.log("Failed to load Projects:", error);
      setProjectError(error.message);
    } finally {
      setProjectLoading(false);
    }
  }

  async function fetchUsers() {
    try {
      const token = localStorage.getItem("userToken");

      const res = await axios.get(`${BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data);
    } catch (error) {
      console.log("Failed to load Users:", error);
      setUsersError(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Something went wrong",
      );
    } finally {
      setUsersLoading(false);
    }
  }

  async function fetchTeams() {
    try {
      setTeamLoading(true);
      setTeamError(null);

      const token = localStorage.getItem("userToken");

      const res = await axios.get(`${BASE_URL}/teams`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTeams(res.data);
    } catch (error) {
      console.log("Failed to load Teams:", error);
      setTeamError(error.message);
    } finally {
      setTeamLoading(false);
    }
  }

  async function fetchTasks() {
    try {
      setTaskLoading(true);
      setTaskError(null);

      const token = localStorage.getItem("userToken");

      const res = await axios.get(`${BASE_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (error) {
      console.log("Failed to load Tasks:", error);
      setTaskError(error.message);
    } finally {
      setTaskLoading(false);
    }
  }

  const statusOptions = ["To Do", "In Progress", "Completed", "Blocked"];

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (token) {
      fetchProjects();
      fetchUsers();
      fetchTeams();
      fetchTasks();
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        fetchProjects,
        projectLoading,
        projectError,
        projects,
        fetchUsers,
        usersLoading,
        usersError,
        users,
        fetchTeams,
        teamLoading,
        teamError,
        teams,
        fetchTasks,
        taskLoading,
        taskError,
        tasks,
        statusOptions,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
