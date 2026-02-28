import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import { useDataContext } from "../context/DataContext";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AddNewTask = ({ isOpen, onClose }) => {
  const { users, projects, teams, fetchTasks, statusOptions } =
    useDataContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    project: "",
    team: "",
    owners: [],
    tags: [],
    dueDate: "",
    status: "",
  });

  if (!isOpen) return null;

  const inputHandler = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        owners: checked
          ? [...prev.owners, value]
          : prev.owners.filter((id) => id !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.project ||
      !formData.team ||
      formData.owners.length === 0 ||
      !formData.dueDate
    ) {
      return setError("Please Fill the required fields");
    }

    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("userToken");

      await axios.post(`${BASE_URL}/tasks`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Task created successfully");

      setFormData({
        name: "",
        project: "",
        team: "",
        owners: [],
        tags: [],
        dueDate: "",
        status: "To Do",
      });

      onClose();
      await fetchTasks();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create Task");
      toast.error(err?.response?.data?.message || "Failed to create Task");
    } finally {
      setLoading(false);
    }
  };

  const tagOptions = [
    { value: "Urgent", label: "Urgent" },
    { value: "Bug", label: "Bug" },
    { value: "Feature", label: "Feature" },
    { value: "Improvement", label: "Improvement" },
    { value: "UI", label: "UI" },
    { value: "Backend", label: "Backend" },
    { value: "Frontend", label: "Frontend" },
    { value: "API", label: "API" },
    { value: "In Testing", label: "In Testing" },
    { value: "Blocked", label: "Blocked" },
    { value: "Documentation", label: "Documentation" },
  ];

  return (
    <div>
      <div className="modal fade show d-block">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create New Task</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {error && (
                  <div className="alert alert-danger py-2">{error}</div>
                )}

                <label htmlFor="name">Task Name:</label>

                <input
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={inputHandler}
                  className="form-control mb-3 mt-2"
                  placeholder="Enter Task Name"
                  autoComplete="true"
                />

                <label htmlFor="project">Select Project:</label>
                <br />

                <select
                  name="project"
                  id="project"
                  className="form-select mt-2"
                  value={formData.project}
                  onChange={inputHandler}
                >
                  <option value="" disabled>
                    --Select project--
                  </option>
                  {projects?.length > 0 &&
                    projects.map((project) => {
                      return (
                        <option key={project?._id} value={project?._id}>
                          {project?.name}
                        </option>
                      );
                    })}
                </select>

                <br />

                <label htmlFor="team">Select Team:</label>
                <br />

                <select
                  name="team"
                  id="team"
                  className="form-select mt-2"
                  onChange={inputHandler}
                  value={formData.team}
                >
                  <option value="" disabled>
                    --Select team--
                  </option>
                  {teams?.length > 0 &&
                    teams.map((team) => {
                      return (
                        <option key={team?._id} value={team?._id}>
                          {team?.name}
                        </option>
                      );
                    })}
                </select>

                <br />
                <label className="form-label">Owners:</label>

                {users.map((user) => (
                  <div key={user._id} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="owners"
                      value={user._id}
                      id={user._id}
                      onChange={inputHandler}
                      checked={formData.owners.includes(user._id)}
                    />
                    <label htmlFor={user._id} className="form-check-label">
                      {user.name}
                    </label>
                  </div>
                ))}

                <br />
                <label className="mb-2">Tags:</label>

                <Select
                  isMulti
                  options={tagOptions}
                  value={tagOptions.filter((tag) =>
                    formData.tags.includes(tag.value),
                  )}
                  onChange={(selected) =>
                    setFormData((prev) => ({
                      ...prev,
                      tags: selected.map((tag) => tag.value),
                    }))
                  }
                  placeholder="Select Tags"
                />
                <br />

                <label htmlFor="dueDate">Due Date:</label>
                <br />
                <input
                  type="date"
                  name="dueDate"
                  id="dueDate"
                  className="form-control mt-2"
                  value={formData.dueDate}
                  onChange={inputHandler}
                />
                <br />

                <label htmlFor="status">Select Status:</label>
                <br />

                <select
                  name="status"
                  id="status"
                  className="form-select mt-2"
                  value={formData.status}
                  onChange={inputHandler}
                >
                  <option value="" disabled>
                    --Select Status--
                  </option>
                  {statusOptions.map((status) => {
                    return (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>
    </div>
  );
};

export default AddNewTask;
