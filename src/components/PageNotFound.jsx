import { useNavigate } from "react-router-dom";
import { FaRegMeh } from "react-icons/fa";
import { Button } from "reactstrap";
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      className=""
      style={{
        minHeight: "80vh",
        minWidth: "90vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="display-6">
        Errrrr... 404 / Page not found :( <FaRegMeh className="text-warning" />
      </div>
      <Button
        className="mt-4"
        size="md"
        color="primary"
        onClick={() => navigate("/")}
      >
        Back to dashboard
      </Button>
    </div>
  );
};

export default PageNotFound;
