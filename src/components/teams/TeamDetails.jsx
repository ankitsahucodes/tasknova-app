import { useParams, Link } from "react-router-dom";
import { useDataContext } from "../../context/DataContext";
import { useState } from "react";
import axios from "axios";
import Spinner from "../Spinner";
import AvatarGroup from "./AvatarGroup";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


const TeamDetails = () => {
  const { teams, users, teamLoading, fetchTeams } = useDataContext();
  const { teamId } = useParams();

  const [loading, setLoading] = useState(false);

  const teamData = teams.find((team) => team._id === teamId);

  if (teamLoading || !teamData) return <Spinner />;

  const teamMemberIds = teamData.members.map((m) => m._id);

  const usersNotInTeam = users.filter(
    (user) => !teamMemberIds.includes(user._id),
  );

  const updateTeam = async (memberId) => {
    if (!memberId) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("userToken");

      const res = await axios.put(
        `${BASE_URL}/teams/${teamId}`,
        {
          memberId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(res.data.message || "Member Added");
      await fetchTeams();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error || "Failed to add Member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3">
      <Link to="/teams" className="text-decoration-none text-color-primary">
        <strong>← Back to Teams</strong>
      </Link>

      <h3 className="mt-3">{teamData.name}</h3>

      {teamData.description && (
        <h5 className="my-3">
          <strong>Description: </strong>
          {teamData.description}
        </h5>
      )}

      <strong className="text-secondary">MEMBERS</strong>

      <ul className="list-unstyled mt-2">
        {teamData.members.map((user) => (
          <li key={user._id} className="d-flex align-items-center mb-2">
            <span className="me-2">
              <AvatarGroup members={[user]} />
            </span>
            {user.name}
          </li>
        ))}
      </ul>

      {loading && (
        <div className="my-2">
          <Spinner />
        </div>
      )}

      <div className="col-md-4 mt-2">
        <select
          className="form-select"
          defaultValue=""
          onChange={(e) => updateTeam(e.target.value)}
        >
          <option value="">--- Add New Member ---</option>

          {usersNotInTeam.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TeamDetails;
