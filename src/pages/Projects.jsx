import AddNewProject from "../components/AddNewProject";
import { useDataContext } from "../context/DataContext";
import { useState } from "react";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { Link } from "react-router-dom";

const Projects = () => {
  const { projects, fetchProjects, projectLoading, projectError } =
    useDataContext();

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [search, setSearch] = useState("");

  if (projectLoading) return <Spinner />;
  if (projectError) return <ErrorMessage message={projectError} />;

  const filteredProjects = projects.filter((project) =>
    project.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <div className="my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Projects..."
          name="searchBar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="d-flex justify-content-between">
        <h2 className="fw-bold">Projects</h2>

        <div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowProjectModal(true)}
          >
            + New Project
          </button>
          <AddNewProject
            isOpen={showProjectModal}
            onClose={() => setShowProjectModal(false)}
            onProjectCreated={fetchProjects}
          />
        </div>
      </div>

      <div className="row">
        {filteredProjects.length > 0 ?
          filteredProjects?.map((project) => (
            <div key={project?._id} className="col-md-6 col-lg-4 col-12 my-3">
              <Link
                className="text-decoration-none"
                to={`/projects/${project._id}`}
              >
                <div className="card p-3 bg-light border border-0 h-100">
                  <h5 className="fw-bold">{project?.name}</h5>
                  <p>{project?.description}</p>
                </div>
              </Link>
            </div>
          )) : <p>No Project Found</p>}
      </div>
    </div>
  );
};

export default Projects;
