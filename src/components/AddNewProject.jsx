import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AddNewProject({ isOpen, onClose, onProjectCreated }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      return setError("Project name is required");
    }

    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("userToken");

      await axios.post(`${BASE_URL}/projects`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Project created successfully");

      onProjectCreated?.();

      setFormData({
        name: "",
        description: "",
      });

      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="modal fade show d-block">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create New Project</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {error && (
                  <div className="alert alert-danger py-2">{error}</div>
                )}

                <label htmlFor="name">Project Name:</label>

                <input
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control mb-3 mt-2"
                  placeholder="Project Name"
                />

                <label htmlFor="description">Project Description:</label>

                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control mt-2"
                  placeholder="Project Description"
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
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
}

export default AddNewProject;
