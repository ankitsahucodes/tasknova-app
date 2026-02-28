import { useDataContext } from "../context/DataContext";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Settings = () => {
  const {
    projects,
    fetchProjects,
    projectLoading,
    projectError,
    fetchTeams,
    teamLoading,
    teamError,
    teams,
    fetchTasks,
    taskLoading,
    taskError,
    tasks,
  } = useDataContext();

  const deleteProject = async (projectId) => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.delete(`${BASE_URL}/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Project deleted successfully");

      await projectLoading;
      await fetchProjects();
      await taskLoading;
      await fetchTasks()
    } catch (error) {
      console.error("Error deleting Project:", error);
      toast.error("Failed to delete Project");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.delete(`${BASE_URL}/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Task deleted successfully");

      await taskLoading;
      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
  };

  const deleteTeam = async (teamId) => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.delete(`${BASE_URL}/teams/${teamId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Team deleted successfully");

      await teamLoading;
      await fetchTeams();
    } catch (error) {
      console.error("Error deleting Team:", error);
      toast.error("Failed to delete Team");
    }
  };

  return (
    <div className="mt-3">
      <div>
        <h3 className="mt-3 fw-bold">Manage Projects</h3>

        {projectLoading && <Spinner />}
        {projectError && <ErrorMessage message={projectError} />}

        <div className="row">
          {projects.length > 0 &&
            projects?.map((project) => (
              <div key={project?._id} className="col-md-6 col-lg-4 col-12 my-3">
                <div className="card p-3 bg-light border-0 h-100 d-flex justify-content-between">
                  <h5 className="fw-bold">{project?.name}</h5>
                  <p>{project?.description}</p>

                  <div>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteProject(project._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <hr className="border-3" />
      <div>
        <h3 className="mt-3 fw-bold">Manage Tasks</h3>

        {taskLoading && <Spinner />}
        {taskError && <ErrorMessage message={taskError} />}

        <div className="row">
          {tasks.length > 0 &&
            tasks?.map((task) => (
              <div key={task?._id} className="col-md-6 col-lg-4 col-12 my-3">
                <div className="card p-3 bg-light border-0 h-100 d-flex justify-content-between">
                  <h5 className="fw-bold">{task?.name}</h5>
                  <div className="d-flex justify-content-between mt-3">
                    <div
                      className={`badge px-3 py-2 ${
                        task.status === "In Progress"
                          ? "bg-warning text-dark"
                          : task.status === "Completed"
                            ? "bg-success"
                            : task.status === "Blocked"
                              ? "bg-danger"
                              : "bg-info"
                      }`}
                    >
                      {task.status}
                    </div>

                    <div>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteTask(task._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <hr className="border-3" />

      <div>
        <h3 className="mt-3 fw-bold">Manage Teams</h3>

        {teamLoading && <Spinner />}
        {teamError && <ErrorMessage message={teamError} />}

        <div className="row">
          {teams.length > 0 &&
            teams?.map((team) => (
              <div key={team?._id} className="col-md-6 col-lg-4 col-12 my-3">
                <div className="card p-3 bg-light border-0 h-100 d-flex justify-content-between">
                  <h5 className="fw-bold">{team?.name}</h5>
                  <p>{team?.description}</p>

                  <div>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteTeam(team._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
