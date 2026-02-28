import { useState } from "react";
import CreateTeam from "../CreateTeam";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import TeamCard from "./TeamCard";
import { Link } from "react-router-dom";
import { useDataContext } from "../../context/DataContext";

const Teams = () => {
  const { teamLoading, teamError, teams } = useDataContext();
  const [showTeamModal, setShowTeamModal] = useState(false);

  if (teamLoading) return <Spinner />;
  if (teamError) return <ErrorMessage message={teamError} />;

  return (
    <div className="mt-4 mb-2">
      <div className="d-flex justify-content-between">
        <h2>Teams</h2>

        <div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowTeamModal(true)}
          >
            + New Team
          </button>
          <CreateTeam
            isOpen={showTeamModal}
            onClose={() => setShowTeamModal(false)}
          />
        </div>
      </div>

      <div className="mt-4">
        <div className="row g-4">
          {teams.map((team) => (
            <div className="col-md-6 col-lg-4 col-12 col-sm-6" key={team._id}>
              <Link
                to={`/teams/${team._id}`}
                key={team._id}
                style={{ textDecoration: "none" }}
              >
                <TeamCard team={team} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;
