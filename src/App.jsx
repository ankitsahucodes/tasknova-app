import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ToggleSidebar from "./components/ToggleSidebar";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-md-3 col-lg-2 d-none d-md-block"
          style={{ background: "#EDE9FE", minHeight: "100vh" }}
        >
          <Sidebar />
        </div>

        <div className="col-12 col-md-9 col-lg-10">
          <div className="d-md-none py-2">
            <div className="row">
              <div className="col-4">
                <ToggleSidebar />
              </div>

              <div style={{ color: "#6650EC" }} className="fs-4 fw-bold col-8">
                Tasknova
              </div>
            </div>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default App;
