import { FaHeart, FaReact } from "react-icons/fa";

const Footer = () => {
  return (
    <div
      className="bg-dark text-white text-center"
      style={{
        width: "100vw",
      }}
    >
      <div style={{ fontSize: "1.2rem" }} className="p-3">
        Made with <FaHeart className="text-danger" /> in React{" "}
        <FaReact className="text-info" />
      </div>
    </div>
  );
};

export default Footer;
