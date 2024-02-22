import { Link, useLocation } from "react-router-dom";
import "./index.css";
import {
  FaTachometerAlt,
  FaRegUserCircle,
  FaBook,
  FaRegCalendarAlt,
  FaUsers,
  FaInbox,
  FaHistory,
  FaRegQuestionCircle,
  FaVideo,
} from "react-icons/fa";
function KanbasNavigator() {
  const links = [
    { label: "Account", icon: <FaRegUserCircle className="fs-2" /> },
    { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" /> },
    { label: "Courses", icon: <FaBook className="fs-2" /> },
    { label: "Calendar", icon: <FaRegCalendarAlt className="fs-2" /> },
    { label: "Inbox", icon: <FaInbox className="fs-2" /> },
    { label: "History", icon: <FaHistory className="fs-2" /> },
    { label: "Studio", icon: <FaVideo className="fs-2" /> },
    { label: "Help", icon: <FaRegQuestionCircle className="fs-2" /> },
  ];
  const { pathname } = useLocation();
  return (
    <div className="navigator-container">
      <img src="/images/neu.jpg" alt="Profile" className="navigator-image" />
      <ul className="wd-kanbas-navigation">
        {links.map((link, index) => (
          <li
            key={index}
            className={pathname.includes(link.label) ? "wd-active" : ""}
          >
            <Link to={`/Kanbas/${link.label}`}>
              {" "}
              {link.icon} {link.label}{" "}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default KanbasNavigator;
