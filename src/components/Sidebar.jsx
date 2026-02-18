import { Link } from "react-router-dom";
import { MdOutlineDashboard, MdLogout } from "react-icons/md";
import { BsBarChartFill } from "react-icons/bs";
import { AiOutlineTeam } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { CgMenuGridO } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userMail");

        toast.success("Logged Out Successfully!");
       
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      
    }
  return (
      <div className="container d-flex flex-column py-3" >
            <div className="d-flex flex-column gap-3" >
                <div className="fw-bold mb-1 text-decoration-none d-none d-md-block">
                    <span className="fw-bold fs-3" style={{ color: "#6650EC" }}>Tasknova</span>
                </div>
                <Link to="/" className="fw-bold mb-1 text-secondary text-decoration-none d-flex align-items-center gap-1">
                    <MdOutlineDashboard className="fs-4 text-secondary" />
                    <span className="fw-bold fs-5 text-secondary">Dashboard</span>
                </Link>
                
                <Link to="/teams" className="fw-bold mb-1 text-secondary text-decoration-none d-flex align-items-center gap-1">
                    <AiOutlineTeam className="fs-4 text-secondary" />
                    <span className="fw-bold fs-5 text-secondary">Team</span>
                </Link>
                <Link to="/projects" className="fw-bold mb-1 text-secondary text-decoration-none d-flex align-items-center gap-1">
                    <CgMenuGridO className="fs-4 text-secondary" />
                    <span className="fw-bold fs-5 text-secondary">Projects</span>
                </Link>
                <Link to="/reports" className="fw-bold mb-1 text-secondary text-decoration-none d-flex align-items-center gap-1">
                    <BsBarChartFill className="fs-4 text-secondary" />
                    <span className="fw-bold fs-5 text-secondary">Reports</span>
                </Link>
                <Link to="/settings" className="fw-bold mb-1 text-secondary text-decoration-none d-flex align-items-center gap-1">
                    <IoMdSettings className="fs-4 text-secondary" />
                    <span className="fw-bold fs-5 text-secondary">Settings</span>
                </Link>
               

                <div type="button" onClick={handleLogout} className="fw-bold mb-1 text-danger text-decoration-none d-flex align-items-center gap-1">
                    <MdLogout className="fs-4 text-danger" />
                    <span className="fw-bold fs-5 text-danger">Logout</span>
                </div>
            </div>
        </div>
  );
};

export default Sidebar;
