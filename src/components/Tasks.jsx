import { useDataContext } from "../context/DataContext";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import AvatarGroup from "./teams/AvatarGroup";

const Tasks = ({ filteredTasks }) => {
  const { taskLoading, taskError } = useDataContext();

  if (taskLoading) return <Spinner />;
  if (taskError) return <ErrorMessage message={taskError} />;
  return (
    <div>
      <div className="row">
        {filteredTasks.length > 0 ? (
          filteredTasks?.map((task) => (
            <div key={task?._id} className="col-md-6 col-lg-4 col-12 my-3">
              <Link className="text-decoration-none" to={`/tasks/${task._id}`}>
                <div className="card p-4 bg-light border-0 h-100">
                  <div>
                    <span
                      className={`badge mb-2 px-3   ${
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
                    </span>
                  </div>

                  <h5 className="fw-bold pb-2">{task.name}</h5>
                  <p className="text-body-tertiary small fw-semibold mb-2">
                    Due on: {new Date(task.dueDate).toDateString()}
                  </p>

                  <AvatarGroup members={task.owners || []} />
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-start py-4 text-muted">
            <h5 className="mt-3 fw-semibold">No Task Found</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
