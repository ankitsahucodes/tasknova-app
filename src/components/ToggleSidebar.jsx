import Sidebar from "./Sidebar";
import { FaBars } from "react-icons/fa";

function ToggleSidebar() {
  return (
    <div>
      <button
        className="btn"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasWithBothOptions"
        aria-controls="offcanvasWithBothOptions"
      >
        {" "}
        <FaBars className="fs-4 text-secondary" size="1.2em" />
      
      </button>
      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        tabIndex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div className="offcanvas-header" style={{ background: "#EDE9FE" }}>
          <div
            style={{ color: "#6650EC" }}
            className="text-center fs-1 fw-bold"
          >
            Tasknova
          </div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body" style={{ background: "#EDE9FE" }}>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default ToggleSidebar;
