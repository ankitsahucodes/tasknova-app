import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDataContext } from "../context/DataContext";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CreateTeam = ({ isOpen, onClose }) => {
  const { users, fetchTeams } = useDataContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    members: [],
  });

  if (!isOpen) return null;

  const inputHandler = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        members: checked
          ? [...prev.members, value]
          : prev.members.filter((id) => id !== value),
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

    if (!formData.name) {
      return setError("Team name is required");
    }

    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("userToken");

      await axios.post(`${BASE_URL}/teams`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Team created successfully");

      await fetchTeams();

      setFormData({
        name: "",
        description: "",
        members: [],
      });

      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create team");
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
              <h5 className="modal-title">Create New Team</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {error && (
                  <div className="alert alert-danger py-2">{error}</div>
                )}

                <label htmlFor="name">Team Name:</label>

                <input
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={inputHandler}
                  className="form-control mb-3 mt-2"
                  placeholder="Team Name"
                  autoComplete="true"
                />

                <label htmlFor="description">Team Description:</label>

                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={inputHandler}
                  className="form-control mt-2"
                  placeholder="Team Description"
                />

                <label className="form-label mt-2">Members:</label>

                {users.map((user) => (
                  <div key={user._id} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="members"
                      value={user._id}
                      id={user._id}
                      onChange={inputHandler}
                      checked={formData.members.includes(user._id)}
                    />
                    <label htmlFor={user._id} className="form-check-label">
                      {user.name}
                    </label>
                  </div>
                ))}
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

export default CreateTeam;
