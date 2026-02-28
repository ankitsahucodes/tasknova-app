import { useDataContext } from "../context/DataContext";
import { useParams, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TaskDetails = () => {
  const { tasks, taskLoading, statusOptions, fetchTasks } = useDataContext();
  const { taskId } = useParams();

  const taskData = tasks.find((task) => task._id === taskId);

  const updateStatus = async (status) => {
    try {
      const token = localStorage.getItem("userToken");
      if (status === taskData.status) return;

      const res = await axios.put(
        `${BASE_URL}/tasks/${taskId}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(res.data.message || "Status updated");
      await fetchTasks();
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.error || "Update failed");
    }
  };

  if (taskLoading || !taskData) return <Spinner />;

  return (
    <div className="mt-3">
      <Link to="/" className="text-decoration-none text-color-primary">
        <strong>← Back to Dashboard</strong>
      </Link>

      <h2 className="mt-3">
        <strong>{taskData.name}</strong>
      </h2>

      <div className="row">
        <div className="col-md-6">
          <div className="card border-0 bg-light mt-3">
            <div className="card-body">
              <p>
                <strong>Project: </strong> {taskData?.project?.name}
              </p>
              <p>
                <strong>Team: </strong>
                {taskData?.team?.name ? (
                  taskData.team.name
                ) : (
                  <strong className="text-danger">Team Deleted</strong>
                )}
              </p>
              <p>
                <strong>Owners: </strong>
                {taskData.owners?.map((owner) => owner.name).join(", ")}
              </p>
              <p>
                <strong>Tags: </strong>
                {taskData.tags.map((tag) => tag).join(", ")}
              </p>
              <p>
                <strong>Due Date: </strong>
                {new Date(taskData.dueDate).toLocaleDateString("en-GB")}
              </p>
              <p>
                <strong>Status: </strong>
                {taskData.status}
              </p>

              <div className="col-6 mt-2">
                <label htmlFor="status">
                  <strong>Update Status:</strong>
                </label>
                <select
                  className="form-select mt-2"
                  id="status"
                  name="status"
                  value={taskData.status}
                  onChange={(e) => updateStatus(e.target.value)}
                >
                  <option value="">--- Select Task Status ---</option>

                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
