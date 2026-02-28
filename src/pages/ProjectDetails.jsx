import { useParams } from "react-router-dom";
import { useDataContext } from "../context/DataContext";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import AvatarGroup from "../components/teams/AvatarGroup";
import { useState } from "react";
import AddNewTask from "../components/AddNewTask";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const { projects, taskLoading, tasks, statusOptions } = useDataContext();
  const projectData = projects?.find((proj) => proj._id === projectId);

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");

  const projectTasks = tasks?.filter(
    (task) => task?.project?._id === projectId,
  );

  const filteredTasks =
    statusFilter === "All"
      ? projectTasks
      : projectTasks.filter((task) => task.status === statusFilter);

  if (taskLoading) return <Spinner />;

  return (
    <div className="mt-3">
      <Link
        to={`/projects`}
        className="text-decoration-none text-color-primary"
      >
        <strong>← Back to Projects</strong>
      </Link>

      <h2 className="my-3">{projectData?.name}</h2>
      <p>{projectData?.description}</p>

      <div className="d-flex justify-content-between mb-3">
        <div className="d-flex mx-3">
          <label htmlFor="status"></label>
          <select
            className="form-select"
            id="status"
            name="status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowTaskModal(true)}
          >
            + New Task
          </button>
          <AddNewTask
            isOpen={showTaskModal}
            onClose={() => setShowTaskModal(false)}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered align-middle text-nowrap">
          <thead className="table-primary border">
            <tr>
              <th className="text-secondary">TASKS</th>
              <th className="text-secondary">TEAM</th>
              <th className="text-secondary">OWNER</th>
              <th className="text-secondary">DUE ON</th>
              <th className="text-secondary">STATUS</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredTasks.length > 0 &&
              filteredTasks?.map((task) => (
                <tr key={task?._id}>
                  <th scope="row">{task?.name}</th>
                  <td>{task?.team?.name}</td>
                  <td>
                    {" "}
                    <AvatarGroup members={task.owners || []} />
                  </td>
                  <td>{new Date(task?.dueDate).toDateString()}</td>
                  <td>
                    <div
                      className={`badge rounded-pill px-3 py-2  ${
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
                  </td>

                  <td>
                    <Link
                      to={`/tasks/${task?._id}`}
                      className="text-decoration-none "
                    >
                      <div className="text-center fs-5">→</div>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div>
        {filteredTasks.length === 0 && (
          <div className="text-center fw-bold fs-4 text-danger">
            Currently, There are no tasks for this project.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
